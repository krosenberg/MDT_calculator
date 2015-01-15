$('input').on('input', triggerChange);

function triggerChange() {
  var tax_rate = parseFloat($('#tax_rate').val())/100;
  var cost_basis = parseFloat($('#cost_basis').val());
  var num_shares = parseFloat($('#num_shares').val());
  var share_price = parseFloat($('#share_price').val());
  var capital_gain = parseFloat($('#capital_gain').val());
  var taxes_owed = parseFloat($('#taxes_owed').val());
  var new_basis = parseFloat($('#new_basis').val());
  var new_price = parseFloat($('#new_price').val());

  var val1 = num_shares * share_price - cost_basis;
  $('#capital_gain').val(val1.toFixed(2));

  var capital_gain = parseFloat($('#capital_gain').val());

  var val2 = capital_gain * tax_rate
  $('#taxes_owed').val(val2.toFixed(2));

  var val3 = share_price * num_shares
  $('#new_basis').val(val3.toFixed(2));

  var taxes_owed = parseFloat($('#taxes_owed').val());

  var val4 = share_price-taxes_owed/(num_shares*(tax_rate-1));
  $('#new_price').val(val4.toFixed(2));

  console.log(val1, val2, val3, val4);  
}

function loadDefaults() {
  $('#tax_rate').val(15);
  $('#cost_basis').val(1000);
  $('#num_shares').val(50);
  $('#share_price').val(70);
  fetchPrice();
}

loadDefaults();

$('#load_price').click(fetchPrice);

function fetchPrice() {
  var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%3D%22MDT%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=quote"
  $.ajax({
      url: url,
      dataType: "jsonp",
      jsonp: "callback",
      jsonpCallback: "quote"
  });

  quote = function(data) {
      $("#share_price").val(data.query.results.quote.BidRealtime);
      triggerChange();
  };
}