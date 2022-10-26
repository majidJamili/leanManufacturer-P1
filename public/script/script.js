
const draggables = document.querySelectorAll('.draggable'); 
const containers = document.querySelectorAll('.container');
const form = document.querySelector('form');

function setAttributes(element, attributes){
          Object.keys(attributes).forEach(attr=>{
            element.setAttribute(attr,attributes[attr]);
          });
        }


function updateContainerContent() {
  

  
  
  containers.forEach(container =>{
    const containerAttributes = {name: 'containers', type: 'hidden', value: container.id};

    var containerInputs = document.createElement('input'); 
        setAttributes(containerInputs, containerAttributes); 
        container.appendChild(containerInputs);

        var products = container.querySelectorAll('.draggable')
        products.forEach(product =>{
          const productAttributes = {name: container.title, type: 'hidden', value: product.id}; 
          var productInputs = document.createElement('input'); 
          setAttributes(productInputs,productAttributes);
          product.appendChild(productInputs);
        })
  })
}

// form.addEventListener("submit", function(event){
//   //event.preventDefault(); 

//   //event.stopPropagation(); 
//   console.log('Submitted form...!')
// }) 




//save change in drag and drop

draggables.forEach(draggable=>{
  draggable.addEventListener('dragend', function(){ 
    //const form = document.querySelector('form');
    // form.requestSubmit(); 
    if (form.requestSubmit) {
      form.requestSubmit();
    } else {
      form.submit();
    }
  });
})



draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}


(function () {
  'use strict'
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.validated-form')
  // Loop over them and prevent submission
  Array.from(forms)
      .forEach(function (form) {
          form.addEventListener('submit', function (event) {
              if (!form.checkValidity()) {
                  event.preventDefault()
                  event.stopPropagation()
              }
              form.classList.add('was-validated')
          }, false)
      })
})()



// form.addEventListener("submit", function(event){
//   event.preventDefault(); 
//   console.log('Submitted form...!')
// })