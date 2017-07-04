// constructs the suggestion engine
$( document ).ready(function() {

var states=  ['Sacramento','Benicia', 'Palo Alto', 'San Francisco', "Los Angeles"]

var states = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  local: states
});

$('#bloodhound .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'states',
  source: states
});



});
