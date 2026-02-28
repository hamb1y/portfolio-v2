#!/usr/bin/env python3
import json
import re
import sys


def parse_object(text):
    """Parse a single JS object string to dict."""
    lines = text.strip().split("\n")
    obj = {}
    current_key = None
    current_value = []
    for line in lines:
        line = line.rstrip()
        # Check if line contains a key-value pair
        # Look for colon not inside quotes
        colon_pos = line.find(":")
        if colon_pos > 0 and not line[:colon_pos].strip().startswith(" "):
            # New key
            if current_key is not None and current_value:
                val = " ".join(current_value).strip()
                if val.startswith('"') and val.endswith('"'):
                    val = val[1:-1]
                obj[current_key] = val
                current_value = []
            key = line[:colon_pos].strip()
            if key.startswith('"') and key.endswith('"'):
                key = key[1:-1]
            current_key = key
            val_part = line[colon_pos + 1 :].strip()
            if val_part:
                current_value.append(val_part)
        else:
            # Continuation of value
            if line.strip():
                current_value.append(line.strip())
    # Last key-value
    if current_key is not None and current_value:
        val = " ".join(current_value).strip()
        if val.startswith('"') and val.endswith('"'):
            val = val[1:-1]
        obj[current_key] = val
    return obj


def main():
    with open("/tmp/achievements_array.js", "r") as f:
        content = f.read()

    # Split by '},' but careful about nested braces (none)
    # Use regex to find objects
    pattern = r"\{[^}]+\}"
    matches = re.findall(pattern, content, re.DOTALL)
    print(f"Found {len(matches)} objects")

    output_dir = "/home/hamb/devel/nportfolio/main/src/content/achievements"
    # Clear existing
    import shutil, os

    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)
    os.makedirs(output_dir)

    for i, match in enumerate(matches):
        obj = parse_object(match)
        # Convert boolean string
        featured = obj.get("featured", "false")
        priority = 1 if featured == "true" else 0
        new_ach = {
            "type": obj.get("achievement-type", ""),
            "title": obj.get("title", ""),
            "description": obj.get("description", ""),
            "image": obj.get("image", ""),
            "priority": priority,
        }
        # Filename
        ach_id = obj.get("achievement-id", "").lower().replace("-", "_")
        if not ach_id:
            ach_id = f"achievement_{i}"
        filename = f"{ach_id}.json"
        with open(os.path.join(output_dir, filename), "w") as f:
            json.dump(new_ach, f, indent=2)
        print(f"Created {filename}")

    print("Done")


if __name__ == "__main__":
    main()
