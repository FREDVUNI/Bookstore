$("#adduser").submit((event)=>{
    alert("user has been saved.")
    $("#alert").show();
})
$("#userupdate").submit((event)=>{
    event.preventDefault();
    let unindexed_array = $("#userupdate").serializeArray();
    let data = {}

    $.map(unindexed_array,(n,i)=>{
        data[n['name']] = n['value']
    })
    console.log(data);

    let request = {
        "url":`http://localhost:3000/api/users/${data._id}`,
        "method":"PUT",
        "data":data
    }
    $.ajax(request).done((response)=>{
        alert("user has been updated.")
    })
})  
if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(()=>{
        let id = $(".table tbody td a.delete").attr("data-id")
        let request = {
        "url":`http://localhost:3000/api/users/${id}`,
        "method":"DELETE",
    }
    if(confirm("Are you sure?")){
        $.ajax(request).done((response)=>{
            alert("user has been deleted.")
            location.reload()
        })
    }
    })
}