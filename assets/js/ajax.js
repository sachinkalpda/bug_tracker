

$(document).ready(function(){

    // for render the bugs on project details page
    function appendBug(bugs){
        let buglist = $('.bug-list');
        buglist.html('');
        if(bugs.length == 0){
            buglist.html('<h4>No Data Found!</h4>');
        }
        for(let bug of bugs ){
            buglist.append(`<a href="/bug/view/${bug._id}">
            <div class="issue-card">
                <p class="issue-title">${bug.title}</p>
                <span>${moment(bug.createdAt).fromNow()}</span>
                <div class="issue-footer">
                    <div class="status-open">Open</div>
                    <div class="author">Raised By <span>${bug.user.name}</span></div>
                </div>
            </div>
        </a>`);
        }
    }
    // for render the bugs on project details page
    function appendClosed(bugs){
        let buglist = $('.bug-list-closed');
        buglist.html('');
        if(bugs.length == 0){
            buglist.html('<h4>No Data Found!</h4>');
        }
        for(let bug of bugs ){
            buglist.append(`<a href="/bug/view/${bug._id}">
            <div class="issue-card">
                <p class="issue-title">${bug.title}</p>
                <span>${moment(bug.createdAt).fromNow()}</span>
                <div class="issue-footer">
                    <div class="status-closed">Closed</div>
                    <div class="author">Raised By <span>${bug.user.name}</span></div>
                </div>
            </div>
        </a>`);
        }
    }

    // ajax request to filter the data
    $('#filterBy').on('click',function(e){
        e.preventDefault();
        let projectId = $(this).data('project');
        let labels = [];
        $('.check-label').each(function(){
            if(this.checked == true){
                labels.push($(this).val());
            }
        });
        if(labels.length == 0){
            console.log('Please Select At least one label');
            return;
        }
        $.ajax({
            type: 'post',
            url : '/bug/filter',
            data :  {
                project : projectId,
                labels : labels,
            },
        }).done(function(data){
            console.log(data.bugs);
            let closed = [];
            let open = [];
             data.bugs.filter(function(bug){
                if(bug.status == 'closed'){
                    closed.push(bug);
                }else if(bug.status == 'open'){
                    open.push(bug)
                }
            });
        
            $('#open-issue-count').html(open.length);
            $('#closed-issue-count').html(closed.length);

            appendBug(open);
            appendClosed(closed);
            new Noty({
                theme: 'relax',
                text: data.message,
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show();
        })
        .fail(function(err){
            console.log("error in completing request");
        });
    })

    // ajax request to search the bugs
    $('.search').on('click',function(){
        let input = $('#searchInput');
        let query = input.val();
        let projectId = $(this).data('project');

        $.ajax({
            type: 'post',
            url : '/bug/search',
            data :  {
                project : projectId,
                query : query,
            },
        }).done(function(data){
            console.log(data.bugs);
            let closed = [];
            let open = [];
             data.bugs.filter(function(bug){
                if(bug.status == 'closed'){
                    closed.push(bug);
                }else if(bug.status == 'open'){
                    open.push(bug)
                }
            });
            // console.log(closed); 
            $('#open-issue-count').html(open.length);
            $('#closed-issue-count').html(closed.length);

            appendBug(open);
            appendClosed(closed);
            new Noty({
                theme: 'relax',
                text: data.message,
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show();
        })
        .fail(function(err){
            console.log("error in completing request");
        });
    });


    // ajax request to add label to new bug
    $('#addLabelForm').on('submit',function(e){
        e.preventDefault();
        let values = $(this).serialize();
        let labelList = $('#label-list');
        $.ajax({
            type: 'post',
            url : '/label/add',
            data :  values,
        }).done(function(data){
            labelList.append(`<option value="${data.label._id}">${data.label.title}</option>`)
            $('#addLabel').modal('hide');
            
            new Noty({
                theme: 'relax',
                text: data.message,
                type: 'success',
                layout: 'topRight',
                timeout: 1500
            }).show();
        })
        .fail(function(err){
            console.log("error in completing request");
        });
        
    });

    $('#addLabelTo').on('click',function(e){
        e.preventDefault();
        let labelId = $('#label-list').val();
        let labelTitle = $('#label-list :selected').text();

        $('.label-list-bug').append(`<div class="label-item-bug">
            <span>${labelTitle}</span>
            <i class="fa-regular fa-circle-xmark remove-label" data-id="${labelId}"></i>
        </div>`);

        addLabel(labelId);



       
        
    });

    // for removing the label from the new bug

    $(document).on('click','.remove-label',function(){
        let labelId = $(this).data('id');
        $(this).parent().remove();
        removeLabel(labelId);

    });

    // function for adding label to new bug
    function addLabel(id){
        let input = $('#label-hidden');
        let inputValue = input.val();
        console.log(inputValue);
        if(inputValue == ''){
            let labels = [];
            labels.push(id);
            input.val(JSON.stringify(labels));
            return;
        }
        inputValue = JSON.parse(input.val());
        inputValue.push(id);
        input.val(JSON.stringify(inputValue));
        return;

    }

    function removeLabel(id){
        let input = $('#label-hidden');
        let inputValue = input.val();
        if(inputValue == ''){
            return;
        }
        inputValue = JSON.parse(input.val());
        let result  = inputValue.filter(function(item) {
            return item !== id
        });
        input.val(JSON.stringify(result));
        return;

    }


    

    


    




});