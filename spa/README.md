### Challenge
Name: Spa  
Category: web  
Difficulty: easy  
### Solution
(Using chrome dev-tools)
1. Open the console
2. Go to the sources tab
3. View the beautified source for assets/index-65f76711.js
```javascript
const ag = "YmN0Zns3aDNfdWw3MW00NzNfNXA0XzE1XzRfcjM0YzdfNXA0fQo=";
function cg() {
    const e = ch({
        queryKey: ["admin"],
        queryFn: ()=>fetch("/api/isAdmin").then(t=>t.json())
    });
    return e.data === void 0 || !e.data.isAdmin ? $.jsx($.Fragment, {
        children: "Unauthorized"
    }) : $.jsx($.Fragment, {
        children: $.jsxs("div", {
            id: "ocean",
            className: "full vignette",
            children: [$.jsx(fh, {}), $.jsxs("div", {
                className: "content",
                children: [$.jsx("h1", {
                    children: "Admin page"
                }), $.jsx("p", {
                    children: atob(ag)
                })]
            })]
        })
    })
}
```
Go to console
Execute `atob("YmN0Zns3aDNfdWw3MW00NzNfNXA0XzE1XzRfcjM0YzdfNXA0fQo")` to receive the flag.


### Explanation
Here the code is minified which makes it more difficult to read. By using a code beautifier (like the one in chrome devtools) we can see code to authenticate for admin, and find that the flag is simply encoded in plain text.