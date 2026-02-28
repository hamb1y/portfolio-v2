#!/usr/bin/env python3
import json
import re
from pathlib import Path


def parse_object(lines, start_idx):
    """Parse a JavaScript object from lines starting at start_idx.
    Returns (dict, next_idx)."""
    obj = {}
    i = start_idx
    # Skip opening brace line
    if lines[i].strip() == "{":
        i += 1
    key = None
    value_lines = []
    while i < len(lines):
        line = lines[i].rstrip()
        stripped = line.strip()
        if stripped == "}," or stripped == "}":
            # End of object
            if key is not None and value_lines:
                value = " ".join(value_lines).strip()
                # Remove surrounding double quotes if present
                if value.startswith('"') and value.endswith('"'):
                    value = value[1:-1]
                obj[key] = value
            i += 1
            break
        # Check if line contains a key
        # Pattern: optional spaces, key (maybe quoted), colon, optional value
        colon_pos = line.find(":")
        if colon_pos > 0 and not line[:colon_pos].strip().startswith(" "):
            # New key
            if key is not None and value_lines:
                value = " ".join(value_lines).strip()
                if value.startswith('"') and value.endswith('"'):
                    value = value[1:-1]
                obj[key] = value
                value_lines = []
            key_part = line[:colon_pos].strip()
            # Remove quotes
            if key_part.startswith('"') and key_part.endswith('"'):
                key_part = key_part[1:-1]
            key = key_part
            value_part = line[colon_pos + 1 :].strip()
            if value_part:
                value_lines.append(value_part)
            else:
                # Value continues on next line(s)
                pass
        else:
            # Continuation of value
            if stripped:
                value_lines.append(stripped)
        i += 1
    return obj, i


def main():
    # Read the extracted array file
    with open("/tmp/achievements.js", "r") as f:
        lines = f.readlines()

    # Find start of array (line with '[')
    start = None
    for idx, line in enumerate(lines):
        if line.strip().startswith("["):
            start = idx
            break
    if start is None:
        print("Array start not found")
        return

    # Parse objects
    objects = []
    i = start + 1  # skip '['
    while i < len(lines):
        line = lines[i].strip()
        if line.startswith("{"):
            obj, i = parse_object(lines, i)
            objects.append(obj)
        elif line.startswith("]"):
            break
        else:
            i += 1

    print(f"Parsed {len(objects)} objects")

    output_dir = Path("/home/hamb/devel/nportfolio/main/src/content/achievements")
    output_dir.mkdir(exist_ok=True)

    # Clear existing files
    for f in output_dir.glob("*.json"):
        f.unlink()

    for obj in objects:
        new_ach = {
            "type": obj.get("achievement-type", ""),
            "title": obj.get("title", ""),
            "description": obj.get("description", ""),
            "image": obj.get("image", ""),
            "priority": 1 if obj.get("featured", "").lower() == "true" else 0,
        }
        achievement_id = obj.get("achievement-id", "").lower().replace("-", "_")
        if not achievement_id:
            # fallback
            achievement_id = re.sub(
                r"[^a-z0-9]+", "_", obj.get("title", "").lower()
            ).strip("_")
        filename = f"{achievement_id}.json"
        filepath = output_dir / filename
        with open(filepath, "w") as f:
            json.dump(new_ach, f, indent=2)
        print(f"Created {filename}")

    print("Done")


if __name__ == "__main__":
    main()
