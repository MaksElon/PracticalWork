$(function(){
    $("#input").on("keyup", function() {
      let value = $(this).val().toLowerCase();
      $("#table tr").filter(function() {
        $(this).toggle($(this).children().eq(2).text().toLowerCase().indexOf(value) > -1);
      });
    });
    $('#btnDelete').on('click',DeleteClicked)
    let crypto=GetData();
    crypto.then(i=>WriteInTable(i));
    function WriteInTable(data){     
      let i=0; 
        for(let item of Object.entries(data)){
          i++;
            let tr=document.createElement("tr");
            let td=document.createElement("td");
            td.innerHTML="<td>"+i+"</td>";
            tr.append(td);
            td=document.createElement("td");
            td.innerHTML="<td>"+item[0]+"</td>";
            tr.append(td);
            td=document.createElement("td");
            td.innerHTML="<td>"+item[1].name+"</td>";
            tr.append(td);
            td=document.createElement("td");
            td.innerHTML="<td>"+item[1].humanType+"</td>";
            tr.append(td);
            td=document.createElement("td");
            td.innerHTML="<td>"+item[1].currencyType+"</td>";
            tr.append(td);
            td=document.createElement("td");
            td.innerHTML="<td>"+item[1].minConf+"</td>";
            tr.append(td);
            td=document.createElement("td");
            td.innerHTML="<td>"+parseFloat(item[1].txFee)+"</td>";
            tr.append(td);
            $('#table').append(tr);
          }
          $("#table").on('click','tr',TableClicked);
    }
    function TableClicked(){
      $(this).toggleClass("paint");
      let count=document.getElementsByClassName("paint").length;
      if(count>0)$('#btnDelete').removeAttr('disabled');
      else $('#btnDelete').prop('disabled','true');
    }
    function DeleteClicked(){  
      $(".paint").remove();
      $('#btnDelete').prop('disabled','true');
    }
});
async function GetData(){
    let url="https://poloniex.com/public?command=returnCurrencies";
    let responce=await fetch(url);
    let res= responce.json();
    return res;
}
