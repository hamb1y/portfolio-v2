#!/usr/bin/env python3
import json
import re
import os
import shutil
from pathlib import Path


def parse_js_object(text):
    """Parse a JavaScript object literal string into a Python dict."""
    lines = text.strip().split("\n")
    obj = {}
    current_key = None
    current_value = []
    in_string = False
    string_char = None
    brace_depth = 0

    for line in lines:
        line = line.rstrip()
        i = 0
        while i < len(line):
            ch = line[i]
            if not in_string:
                if ch == '"' or ch == "'":
                    in_string = True
                    string_char = ch
                elif ch == "{":
                    brace_depth += 1
                elif ch == "}":
                    brace_depth -= 1
                elif ch == ":" and brace_depth == 0:
                    # key ended
                    pass
                # TODO: implement proper parsing
                # This is getting complex; let's use a simpler approach
            i += 1

    # Fallback: use regex to extract key-value pairs
    # Pattern: key (quoted or unquoted) : value (string, boolean, number, array)
    # This is hacky but works for simple objects
    pass


def extract_js_array(content, key):
    """Extract JavaScript array text for given key."""
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


def split_js_objects(array_text):
    """Split JavaScript array of objects into individual object strings."""
    # Remove outer brackets
    inner = array_text.strip()[1:-1].strip()
    objects = []
    current = []
    brace_depth = 0
    lines = inner.split("\n")
    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
        current.append(line)
        brace_depth += line.count("{") - line.count("}")
        if brace_depth == 0 and stripped.endswith(","):
            # End of object
            obj_text = "\n".join(current).rstrip(",")
            objects.append(obj_text)
            current = []
    return objects


def js_object_to_dict(obj_text):
    """Convert a JavaScript object string to dict using simple regex."""
    lines = obj_text.split("\n")
    obj = {}
    key = None
    value_lines = []
    for line in lines:
        line = line.strip()
        if not line:
            continue
        # Check if line contains a key-value pair
        # Pattern: (optional spaces) key (quoted or unquoted) : value
        # If line ends with colon, then value continues on next lines
        if ":" in line and not line.startswith(" "):
            # Possibly a new key
            # Save previous key-value
            if key is not None:
                value = "\n".join(value_lines).strip()
                # Remove surrounding quotes if any
                if value.startswith('"') and value.endswith('"'):
                    value = value[1:-1]
                obj[key] = value
                value_lines = []
            # Split key and value
            parts = line.split(":", 1)
            key = parts[0].strip()
            # Remove quotes from key
            if key.startswith('"') and key.endswith('"'):
                key = key[1:-1]
            value_part = parts[1].strip()
            if value_part:
                value_lines.append(value_part)
            else:
                # Value continues on next lines
                pass
        else:
            # Continuation of value
            value_lines.append(line)
    # Last key-value
    if key is not None and value_lines:
        value = "\n".join(value_lines).strip()
        if value.startswith('"') and value.endswith('"'):
            value = value[1:-1]
        obj[key] = value
    return obj


def main():
    config_path = "/home/hamb/devel/portfolio/src/config.ts"
    with open(config_path, "r") as f:
        content = f.read()

    # Extract achievements array
    arr_text = extract_js_array(content, "achievements")
    if not arr_text:
        print("Achievements array not found")
        return

    objects = split_js_objects(arr_text)
    print(f"Found {len(objects)} achievement objects")

    output_dir = Path("/home/hamb/devel/nportfolio/main/src/content/achievements")
    output_dir.mkdir(exist_ok=True)

    # Clear existing files
    for f in output_dir.glob("*.json"):
        f.unlink()

    for i, obj_text in enumerate(objects):
        obj = js_object_to_dict(obj_text)
        # Debug
        print(f"Object {i}: {list(obj.keys())}")

        new_ach = {
            "type": obj.get("achievement-type", ""),
            "title": obj.get("title", ""),
            "description": obj.get("description", ""),
            "image": obj.get("image", ""),
            "priority": 1 if obj.get("featured", "false") == "true" else 0,
        }
        achievement_id = obj.get("achievement-id", "").lower().replace("-", "_")
        if not achievement_id:
            achievement_id = f"achievement_{i}"
        filename = f"{achievement_id}.json"
        filepath = output_dir / filename
        with open(filepath, "w") as f:
            json.dump(new_ach, f, indent=2)
        print(f"Created {filename}")

    print("Achievements migration done")


if __name__ == "__main__":
    main()
