$("#submitSearch").on("click", () => {
    const title = $("#searchBook").val().replace("%20", "+");
    $.ajax({
        url: "/api/search/" + title,
        method: "GET"
    }).then((results) => {
        
        console.log(results);
        for (let i = 0; i < results.length; i++) {
            if (results[i].volumeInfo.imageLinks === undefined){
                results[i].volumeInfo.imageLinks = "";
            }
            $("#results").append(`<li class="list-group-item">
            <div class="row">
                <div class="col-md-1">
                     
                    <img class="img-fluid" src="${results[i].volumeInfo.imageLinks.thumbnail}" onerror="this.onerror=null; this.src='images/default.png'" /> 
    
                </div>
                <div class="col-md-11">
               <h3>${results[i].volumeInfo.title}</h3>
              <h4>By ${results[i].volumeInfo.authors}</h4>
                  <p>${results[i].volumeInfo.description}</p>
                </div>
            </div>
            
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-bookTitle="${results[i].volumeInfo.title}">
              Write a Review
            </button>
            
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Your Review</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <textarea class="form-control" id="bookReview"></textarea>
            <button id="submitReview">Submit</button>
          </div>
        </form>
      </div>
        </li>`);       
        }
    });
});

$("#submitReview").on("click", () => {
    event.preventDefault();
    const bookTitle = button.data("bookTitle");
    const authorName = button.data("bookTitle");
    alert($("#myField").val());

});