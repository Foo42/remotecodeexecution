# Ideas

## Original intent
Provide some way to process user supplied js within a game. Js would be in form of event handlers for example for player collision, or reaching a particular speed. The intent is that the main game could be an elixir app with user js delegated to a node server.

## Practical operation
posting scripts of any size to the server each time would be too slow, so system should allow referencing of scripts by some id, most likely a hash. Caller could then pre-post script to server, then reference it by id when executing. To a lesser extent there is a similar issue with arguments, some will be small but some may represent some larter state, as is the case in a genserver for example, and should probably be passed by some sort of ref. Thirdly we may wish to have some way to supply a context object which varies per call.

## Wider use
Can this use be generalised as some sort of (almost) DB in which scripts and js objects are stored, and the one can be applied to the other? Maybe post a script (by ref) to an object, and have it update the object and (optionally) return the new version of the object to you.

Maybe could use rest semantics such that if you did a GET on /objectId/scriptId it would just return a result, but if you did a POST to /objectId/scriptId it would update the object (and optionally return you the new state).

"return" implies a function. Currently we've just accepted free code and executed it. If we allow definition of a function, how can we execute it? We could wrap the given code in a self executing function before it is compiled, meaning that the given code can use return statements. This can be left to the clients to decide. The service need only execute the script and return the final expression value as it does. How would this work with posting a script at an object to update it? Maybe the rule should be that the object posted at becomes the context, and the modified context becomes the new object at the end?

### Immutability
If storage space was no concern, it may be interesting to have it so that posting a script at an object makes a new object (probably content addressable) while leaving the original untouched. In this world, clients would keep track of the "current" version of a desired object. Obvious issue with this, is with no GC or reference counting, there would be no way for server to know that an old version is unreachable and delete it. The system would continuously grow, in an append only fashion. A bit like git. In fact, storage could probably be implemented using some of git's lower level operations.