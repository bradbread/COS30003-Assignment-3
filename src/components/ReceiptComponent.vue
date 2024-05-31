<template>
    <div v-if="receiptHtml" class="mt-5">
      <h2>Receipt</h2>
      <div v-html="receiptHtml"></div>
      <div class="mt-3 row">
        <button class="btn btn-outline-secondary col-5 p-2 mx-1" @click="printReceipt">Print Receipt</button>
        <button class="btn btn-secondary col-5 p-2 mx-1" @click="sendReceiptToCustomer">Send Receipt</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['receiptHtml'],
    methods: {
      printReceipt() {
        const receiptWindow = window.open('', 'PRINT', 'height=400,width=600');
        receiptWindow.document.write('<html><head><title>Receipt</title>');
        receiptWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css">');
        receiptWindow.document.write('</head><body>');
        receiptWindow.document.write(this.receiptHtml);
        receiptWindow.document.write('</body></html>');
        receiptWindow.document.close();
        receiptWindow.print();
      },
      sendReceiptToCustomer() {
        console.log('Sending receipt...');
        setTimeout(() => {
          console.log('Receipt sent successfully!');
          alert('Receipt sent to your phone number successfully!');
        }, 1000);
      }
    }
  };
  </script>
  