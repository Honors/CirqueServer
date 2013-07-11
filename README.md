Testing
-------
Tests can be performed with quizzical. A single test is of the form:

```sh
curl -s google.com | $assert "google"
```

Given a prefix, for the sake of clarity, that achieves the following.

```sh
assert=$1
```

A list of tests can then be placed in a shell script, e.g., `tests.sh`, and tested as follows.

```sh
./quizzical/test tests.sh
```

Documentation
-------------
The specs for this API are located in `docs.md` and I will take a test-driven approach to implementing them.