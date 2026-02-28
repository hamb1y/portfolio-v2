#!/usr/bin/env python3
import json
import re
import os
from pathlib import Path


def extract_array(content, key):
    """Extract JavaScript array for given key."""
    pattern = rf"{key}:\s*\["
    start = content.find(pattern)
    if start == -1:
        return None
    start = content.find("[", start)
    depth = 1
    i = start + 1
    while i < len(content) and depth > 0:
        if content[i] == "[":
            depth += 1
        elif content[i] == "]":
            depth -= 1
        i += 1
    return content[start:i]


def js_object_to_json(js_text):
    """Convert JavaScript object literal to JSON."""
    # First, quote unquoted keys
    # Pattern: word characters before colon, not inside quotes
    # Simple approach: replace (\w+): with "\1":
    # But avoid already quoted keys
    lines = js_text.split("\n")
    result = []
    for line in lines:
        # Quote unquoted keys
        line = re.sub(r"(\s*)(\w+)(\s*):", r'\1"\2"\3:', line)
        result.append(line)
    text = "\n".join(result)
    # Remove trailing commas before } or ]
    text = re.sub(r",\s*([}\]])", r"\1", text)
    return text


def parse_achievements(content):
    """Parse achievements array from config.ts."""
    arr_text = extract_array(content, "achievements")
    if not arr_text:
        raise ValueError("Achievements array not found")

    # Convert to JSON
    json_text = js_object_to_json(arr_text)

    # Now parse JSON
    try:
        return json.loads(json_text)
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        print("Attempting manual parse...")
        # Manual parse: split by '},' but careful about nested braces
        objects = []
        lines = arr_text.strip()[1:-1].split("\n")
        current = []
        brace_depth = 0
        for line in lines:
            stripped = line.strip()
            if not stripped:
                continue
            current.append(line)
            brace_depth += line.count("{") - line.count("}")
            if brace_depth == 0 and stripped.endswith(","):
                # End of object
                obj_text = "\n".join(current)
                # Convert to JSON
                obj_json = js_object_to_json(obj_text.rstrip(","))
                try:
                    obj = json.loads(obj_json)
                    objects.append(obj)
                except json.JSONDecodeError as e2:
                    print(f"Failed to parse object: {obj_text[:100]}")
                current = []
        return objects


def main():
    config_path = "/home/hamb/devel/portfolio/src/config.ts"
    with open(config_path, "r") as f:
        content = f.read()

    achievements = parse_achievements(content)
    print(f"Parsed {len(achievements)} achievements")

    output_dir = Path("/home/hamb/devel/nportfolio/main/src/content/achievements")
    output_dir.mkdir(exist_ok=True)

    # Clear existing files (optional)
    for f in output_dir.glob("*.json"):
        f.unlink()

    for ach in achievements:
        new_ach = {
            "type": ach.get("achievement-type", ""),
            "title": ach.get("title", ""),
            "description": ach.get("description", ""),
            "image": ach.get("image", ""),
            "priority": 1 if ach.get("featured", False) else 0,
        }
        # Generate filename
        achievement_id = ach.get("achievement-id", "").lower().replace("-", "_")
        if not achievement_id:
            # fallback: slugify title
            slug = re.sub(r"[^a-z0-9]+", "_", ach.get("title", "").lower()).strip("_")
            achievement_id = slug[:50]
        filename = f"{achievement_id}.json"
        filepath = output_dir / filename
        with open(filepath, "w") as f:
            json.dump(new_ach, f, indent=2)
        print(f"Created {filename}")

    print("Migration complete")


if __name__ == "__main__":
    main()
