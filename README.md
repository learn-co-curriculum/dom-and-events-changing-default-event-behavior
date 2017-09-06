# Events deep dive

## Objectives

2. Explore the `preventDefault`
3. Explain the difference between bubbling and capturing events

## Altering the default event behavior

Ok, we're gonna keep working with our Ada Lovelace page.  As you saw in the previous lesson, we can target specific elements, and take action upon a specific event occurring with a callback function.  Well another thing we can do is prevent a default event from occurring.  A default event is an that your browser responds to as part of it's default behavior.  

For example, say we have a vendetta against the letter "g" (71).  We can prevent the input at the bottom of our `index.html` from receiving "g"s. Enter the following in your console:

```js
const input = document.querySelector('input')

input.addEventListener('keydown', function(e) {
  if (e.which === 71) {
    return e.preventDefault()
  }
})
```

Now try to enter "g" in the input — no can do!

Every DOM `event` comes with a `preventDefault` property.  When we call the `preventDefault` method we prevent the default event from taking place. It provides us an opportunity to intercept and tweak user interactions (usually in more helpful ways than preventing them from typing "g").

It's common, for example, to prevent a page from refreshing by a call to clicking on a submit button.  That refresh can cause problems by undoing all of the DOM manipulations.  But we can fix this with the following code that prevent's the default action of a form receiving the submit event:

```js
document.querySelector('form').addEventListener('submit', function(){
  event.preventDefault()
})
```

Now, click on the form's submit button and notice that there is no page refresh.  So as you can see JavaScript gives us all sorts of ways to customize our behavior.  

## Bubbling Events

We have another aspect of events to explore.  Imagine that with our Ada Lovelace document, we want to take one action when the input to add a comment is clicked, but a different action when the rest of the form is clicked.  Add the following code either through the console, or in the `index.js` file.  Then, click on the "Add a comment!" label followed by clicking inside the input.

```js
  const form = document.querySelector('form')
  form.addEventListener('click', function(){
    console.log('form clicked')
  })

  const input = document.querySelector('#add_comment')
  input.addEventListener('click', function(){
    console.log('input clicked')
  })

```    

Did you see what happened with the two clicks?  Upon clicking on the "Add a comment" label, our event listener for the form was triggered.  But when clicking on the input, both the event listeners for the input **and** the form were triggered.  Believe it or not, JavaScript is acting logically.  When you click inside the input the input receives a click event, but isn't also to say that the form received a click event?  It is.  That's why both event listeners were triggered, and thus both statements were logged.  

JavaScript allows us to prevent the these outer elements' event listeners from being triggered.  Once again, we can do so by calling a method on our event, `event.stopPropagation()`.  Refresh the page, then modify the code to the following.    

```js
const form = document.querySelector('form')
form.addEventListener('click', function(){
  console.log('form clicked')
})

const input = document.querySelector('#add_comment')
input.addEventListener('click', function(event){
  console.log('input clicked')
  event.stopPropagation()
})
```

Now when we click on the `input` element, only the input's event listener has been triggered.  The form's eventListener has not.  This is because when we click on an inner element, first that element's event listener gets triggered, then enclosing elements receive the event.  But in this case, when the input's event listener was triggered, we prevented that event from propagating to other elements by calling the `stopPropagation` method.  And problem solved.


## Summary

In this lesson we saw how we can modify the standard behavior of events.  We can prevent the default behavior of events with the use of `e.preventDefault()` and we can stop events from being propagated to other elements with the use of `e.stopPropagation().`

## Resources

- [MDN - Web Events](https://developer.mozilla.org/en-US/docs/Web/Events)
- [StackOverflow - Bubbling and Capturing](http://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing)
- [QuirksMode - Event order](http://www.quirksmode.org/js/events_order.html)

<p class='util--hide'>View <a href='https://learn.co/lessons/events-deep-dive'>Listening To Nodes</a> on Learn.co and start learning to code for free.</p>
