(function($) {
	$.fn.extend({
		animateCss: function (animationName) {
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			this.addClass('animated ' + animationName).one(animationEnd, function() {
			    $(this).removeClass('animated ' + animationName);
			});
		}
	});

    $.fn.gitHubCard = function( options ) {
    	var $this = $(this)
		$('.spinner').show();
        // Establish our default settings
        var settings = $.extend({
        	username	 : null,
        	repo 		 : null,
        	style 		 : 'theme-1'
        }, options);

		$this.html('');

        return this.each( function() {
        	if ( settings.username ) {
        		var url = 'https://api.github.com/users/'+settings.username
        		var reponame = null
        		$.ajax({
        			type:'GET',
        			url:url,
        			success: function(response) {
        				var owner = response;
		        		$this.html('<div style="display:none" class="github-card  '+settings.style+' '+(settings.repo ? 'repo-active': '')+'"><a href="https://github.com/'+settings.username+'"  class="fa fa-github" target="_blank"></a></div>')
        				if(settings.repo) {
        					$.ajax({
        						type:'GET',
        						url:'https://api.github.com/repos/'+settings.username+'/'+settings.repo,
        						success: function (response) {
        							var repo = response
        							reponame = repo.name;
        							$('.repo-wrapper').append(
        								'<div class="reponame"><label>Repo Name</label>'+
        								'<span>'+reponame+'</span></div>'+
        								'<ul class="repo-buttons">'+
	        								'<li data-content="Download '+settings.username+'/'+settings.repo+' on GitHub"><i class="fa fa-cloud-download" aria-hidden="true"></i><a class="github-button" href="https://github.com/'+settings.username+'/'+settings.repo+'/archive/master.zip" data-icon="octicon-cloud-download" data-style="mega" aria-label="Download '+settings.username+'/'+settings.repo+' on GitHub">Download</a></li>'+
	        								'<li data-content="Watch '+settings.username+'/'+settings.repo+' on GitHub"><i class="fa fa-eye" aria-hidden="true"></i><a class="github-button" href="https://github.com/'+settings.username+'/'+settings.repo+'" data-icon="octicon-eye" data-style="mega" aria-label="Watch '+settings.username+'/'+settings.repo+' on GitHub">Watch</a></li>' +
	        								'<li data-content="Star '+settings.username+'/'+settings.repo+' on GitHub"><i class="fa fa-star" aria-hidden="true"></i><a class="github-button" href="https://github.com/'+settings.username+'/'+settings.repo+'" data-icon="octicon-star" data-style="mega" aria-label="Star '+settings.username+'/'+settings.repo+' on GitHub">Star</a></li>'+
	        								'<li data-content="Fork '+settings.username+'/'+settings.repo+' on GitHub"><i class="fa fa-code-fork" aria-hidden="true"></i><a class="github-button" href="https://github.com/'+settings.username+'/'+settings.repo+'/fork" data-icon="octicon-repo-forked" data-style="mega" aria-label="Fork '+settings.username+'/'+settings.repo+' on GitHub">Fork</a></li>'+
	        								'<li data-content="Follow '+settings.username+' on GitHub"><i class="fa fa-github" aria-hidden="true"></i><a class="github-button" href="https://github.com/'+settings.username+'" data-style="mega" aria-label="Follow @'+owner.name+' on GitHub">Follow @'+owner.name+'</a></li>'+
        								'</ul>'
        							)
        							$('.user-count-detail').remove();
        							$('.repo-wrapper').append(
        								'<ul class="user-count-detail"> '+
											'<li class="followers">'+
												'<span class="count-text">'+repo.forks+'</span>'+
												'<span class="small-text">Forks</span>'+
											'</li>'+
											'<li class="following">'+
												'<span class="count-text">'+repo.stargazers_count+'</span>'+
												'<span class="small-text">Stars</span>'+
											'</li>'+
											'<li class="repositories">'+
												'<span class="count-text">'+repo.watchers_count+'</span>'+
												'<span class="small-text">Watchers</span>'+
											'</li>'+
										'</ul>'
        							)
        						},
        						error: function(error) {
        							if(error.status == '404') {
        								$('.repo-wrapper').html('<div class="errorMessage"><h1>'+error.status+'</h1><h3>Repo '+error.statusText+'</h3></div>')
        							}else {
        								$('.repo-wrapper').html('<div class="errorMessage"><h1>'+error.status+'</h1><h3>'+error.statusText+'</h3></div>')
        							}
        						}
        					})
        				}
	        			$this.find('.github-card').append(
	        				'<div class="user_image"><img src="'+owner.avatar_url+'" ></div>'+
	        				'<div class="github-user-detail-wrapper">'+
		        				'<div class="github-user-detail">'+
									'<h1 class="user-name">'+owner.name+'</h1>'+
									(owner.location ? '<span class="user-destination">'+owner.location+'</span>': '<span class="user-destination">&nbsp;</span>') +
									(owner.blog ? '<a href="'+owner.blog+'" target="_blank" class="user-website-link" >Website</a>': '&nbsp;') +
									(owner.email ? '<a href="mailto:'+owner.email+'" class="user-email-link" >Email</a>': '&nbsp;') +
								'</div>'+
								(settings.repo ? '<div class="repo-wrapper"></div>': '') +
								'<ul class="user-count-detail"> '+
									'<li class="followers">'+
										'<span class="count-text">'+owner.followers+'</span>'+
										'<span class="small-text">Followers</span>'+
									'</li>'+
									'<li class="following">'+
										'<span class="count-text">'+owner.following+'</span>'+
										'<span class="small-text">Following</span>'+
									'</li>'+
									'<li class="repositories">'+
										'<span class="count-text">'+owner.public_repos+'</span>'+
										'<span class="small-text">Repositories</span>'+
									'</li>'+
								'</ul>'+
							'</div>'
						)
        				setTimeout(function() {
    						$('.spinner').hide().animateCss('zoomOut');
    						$('.github-card').show().animateCss('flipInY');
        				},2000)
        			},
        			error: function (error) {
						$('.spinner').hide().animateCss('zoomOut');
						$this.html('<div class="errorMessage"><h1>'+error.status+'</h1><h3>'+error.statusText+'</h3></div>')
        			}

        		})

			}
		});
    }

}(jQuery));