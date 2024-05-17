const { createApp } = Vue
const app = createApp()

app.component('app-main', // indicating the component tag
  {
    // define the template for the component
    template: `
    <div>
		<h1>Relaxing Koala</h1>
  	</div>
    `,	

  });

app.mount('#app')