# @mrpotatoes/git-url

An easy way to open a git url to either to the pull request, commits, branches, browse pages using one command.

Just goto to any directory `git` managed directory (a directory with `.git` somewhere in it's parents) and run `git-url`.

Options
```
none        -> open just the browse page
--pr        -> open the pull-requests page
--commits   -> open the commits page
--branches  -> open the branches page
--browse    -> open the browse page
```

Only opens the main page if no flags are provided.

If you add any in combination you'll open all of them in their own links.

Currently only works in mac. Quick fix for all coming.

--- 
# The way it works
Only cares about the host and path segments. _Anything_ else should be ignored.

1. Go-to a git managed directory
1. Run `git-url` and flags into command prompt
    1. Strips the `--` for each flag.
1. Load all external plugins from user directory (`~/.git-url.external.js`)
1. Get the remote repo git url
1. Determine which provider (github, bitbucket et al)
1. Build new base URL
1. Run the provider function and build paths for any/all flags
1. Open the URLs

---
# TODO
* Read configs from YML
    * Lens perhaps?!?!?!
* Use a state monad to transfer state between functions
* Generalize the provider functions so that I don't have to keep writing the same code
* Like, dude, actually write the tests
* Convert to use `babel` so that I can do exports
* Use `babel` to build a single JS file for use external to this machine (aka publishing).
* IO Monads:
    * https://github.com/jacksonmsantana1/IO#readme
    * https://gist.github.com/jimmydivvy/6e42ed2e43014ef55382
    * https://gist.github.com/tabatkins/6f452e2b1d7903a7b3100d79e826ec8c
    * https://medium.com/@luijar/the-observable-disguised-as-an-io-monad-c89042aa8f31
* State Monad
    * https://egghead.io/courses/state-monad-in-javascript