<html>
  <head>
    <link rel="stylesheet" href="https://p.trellocdn.com/power-up.min.css">
    <style>
      select {
        wi: 30px;
      }
    </style>
    <script src="https://p.trellocdn.com/power-up.min.js"></script>
  </head>
  <body>
    <form id="backend_estimate">
      <label for="backend_estimateSize">Backend Estimate:</label>
<!--       <input type ="text" id="resourceLabel"> -->
      <input type="number" step="any" id="backend_estimateSize">
<!--       <input type="submit" value="submit" /> -->
<!--       <select name="size" id="estimateSize">
        <option value="small">Small 👕</option>
        <option value="medium">Medium 👚</option>
        <option value="large">Large 👔</option>
        <option value="x-large">Extra Large 👖</option>
      </select> -->
      
      <label for="frontend_estimateSize">Frontend Estimate:</label>
      <input type="number" step="any" id="frontend_estimateSize">
      
      <button type="submit" class="mod-primary">Save</button>
  
    <script src="./js/estimate.js"></script>
    </form>
  </body>
</html>