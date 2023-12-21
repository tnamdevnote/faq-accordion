# Frontend Mentor - FAQ accordion solution

This is a solution to the [FAQ accordion challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/faq-accordion-wyfFdeBwBz). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Demo](#demo)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- Hide/Show the answer to a question when the question is clicked
- Navigate the questions and hide/show answers using keyboard navigation alone
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Demo
<span>
<img src="https://github.com/tnamdevnote/faq-accordion/assets/44216709/0128b6a6-d108-40a1-b164-0c55fc65dcd6" alt="desktop view" />

### Links

- Solution URL: [Link](https://www.frontendmentor.io/solutions/accessible-faq-accordion-pyKJjcTX8e)
- Live Site URL: [Link](https://accessible-accordion-faq.netlify.app/)

## My process

### Built with

- [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/#rps_label) - Accessibility Guideline
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Vite](https://vitejs.dev/) - React framework
- [Taiilwind CSS](https://tailwindcss.com/) - For styles


### What I learned

#### Accessibility Rule #1: Use appropriate semantic HTML<br>
Keyboard support is important aspects of building an accessibility, especially with interactive components like Accordion. To support expand/collapse behavior with keyboard, we have to use `<button>` element to handle `onClick` events. This is not only semantically appropriate, but also it offers other perks, such as being able to focus on element with a `tab` key or using `disabled` attribute. We would lose these features if we were to use non semantic HTML, such as `<div>`.

```jsx
// Bad
<div
  onClick={handleClick}
>
  Accordion Header with Accessibility Feature
  <span>{isOpen ? <IconMinus /> : <IconPlus />}</span>
</div>

// Good
<h2>
  <button
    onClick={handleClick}
  >
    Accordion Header with Accessibility Feature
    <span>{isOpen ? <IconMinus /> : <IconPlus />}</span>
  </button>
</h2>
```

#### Accessibility Rule #2: Indicate state of accordion `aria-expanded`<br>
Besides adding a keyboard support, another way to improve accessibility on Accordion is by indicating if the control is expanded or not. We can achieve this by adding `aria-expanded` attributes to the `<button>` element.

```jsx
<h2>
  <button
    aria-expanded={isExpanded} // isExpanded resolves to boolean values.
    onClick={handleClick}
  >
    Accordion Header with Accessibility Feature
    <span>{isOpen ? <IconMinus /> : <IconPlus />}</span>
  </button>
</h2>
```
![Screenshot 2023-12-20 at 1 24 29 AM](https://github.com/tnamdevnote/faq-accordion/assets/44216709/cc746e49-26b1-44d5-b654-c965a0ade714)

When we take a look at the accessibility tree in the above image, we can see that `expanded` property is set to true as the second accordion comes into focus with tab key. This allows screen readers to detect the current state of the component, allowing visually impaired people to navigate through the content much easier.<br>

#### Accessibility Rule #3: Linking the panel with the header: `aria-labelledby` and `role`<br>
Another way to improve accessibility of a accordion is to link the contents inside the panel to the header button. In this way, a narrator or other assissitive technology will know where to find the associated content for that accordion. 
We can first link the panel to the header by using `aria-labelledby` attribute in the content element. And thi needs to point to the id attribute of the heading.
Then, we should also add `role` attribute next to `aria-labelledby`. This will tell the browser that the content is associated with whatever the `aria-labelledby` is pointing to. Do note that this feature won't work without either of `role` or `aria-labelledby`. So be sure to use them together.

```jsx

<h2 id="panel-heading">
  <button>
  ...
  </button
<h2>
<div
  aria-labelledby="panel-heading"
  role="region"
>
  <p className="overflow-hidden">{children}</p>
</div>
```
![image](https://github.com/tnamdevnote/faq-accordion/assets/44216709/064bbc74-d2c4-4627-a9cd-619e04854f57)


#### Accessibility Rule #4: Naming the control: `aria-controls` <br>

A final tip for creating accessible accordion is to use `aria-controls` in the `<button>` element. This not only applies to Accordion but also in other situation where you are using `<button>` in other situation to control other elements. The reason for adding `aria-controls` attribute is to let the assissitive tools know which part of the UI or content is affected by the button, and in our case, the `<button>` is controlling the behavior of the panel. Therefore, we want to assign same attribute value as with the `id` in the panel.

```jsx
<h2 id="panel-heading">
  <button
    aria-expanded="true"
    aria-controls="panel-content" // points to id in the <div> tag.
  >
  ...
  </button
<h2>
<div
  id="panel-content"
  aria-labelledby="panel-heading"
  role="region"
>
  <p className="overflow-hidden">{children}</p>
</div>

```


