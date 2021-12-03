# json-transform-vscode
Transform JSON in Visual Studio Code

Use [JMESPath ](https://jmespath.org) to evaluate an expression against selected JSON to transform it into a separate editor pane.

To learn more about JMESPath, check out the [JMESPath Tutorial](http://jmespath.org/tutorial.html) and [JMESPath Examples](https://jmespath.org/examples.html).

## Example

### Expression:
```
locations[?state == 'WA'].name | sort(@) | {WashingtonCities: join(', ', @)}
```

### Sample JSON:
```
{
  "locations": [
    {"name": "Seattle", "state": "WA"},
    {"name": "New York", "state": "NY"},
    {"name": "Bellevue", "state": "WA"},
    {"name": "Olympia", "state": "WA"}
  ]
}
```

### Result:
```
{
  "WashingtonCities": "Bellevue, Olympia, Seattle"
}
```

## Known Issues

None.

## Release Notes

### 1.0.0

Initial release of JSONTransform

## License

MIT License

Copyright (c) 2021 Andrew Yahner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
