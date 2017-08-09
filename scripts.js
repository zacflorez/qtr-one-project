$("document").ready(function() {
  $('.parallax').parallax()
  $('.materialize-textarea').val('New Text')
  $('.materialize-textarea').trigger('autoresize')

	$("#rep-lookup").submit(function(e) {
		e.preventDefault()

		var $results = $('#rep-lookup-results')
		var zipCode = $('#txt-zip').val()
    var key = '797de9d5e36943dc8c711434e521c82b'

		//query API and gather object data
    var api = $.getJSON("https://congress.api.sunlightfoundation.com/legislators?apikey=797de9d5e36943dc8c711434e521c82b")
		var requestURL = ("https://congress.api.sunlightfoundation.com/legislators/locate?callback=?")

		$.get(requestURL, {
			//'apikey': key,
			'zip' : zipCode,
    }).then(function(data) {
      console.log(data)

			if (data.results && data.results.length > 0) {
				var reps = '<h5 id="txt-center">'+'Here are your Representatives:'+'</h5>'

				$.each(data.results, function(i, rep) {
					if ('senate' === rep.chamber.toLowerCase()) {
            reps += '<div class="card-panel blue darken-3">'
						reps += '<ul>'
						reps += '<h4>'+ rep.first_name + ' ' + rep.last_name + '</h4>'
            reps += '<li>' + '<span>' + rep.title + ' - ' + rep.state_name + ' - ' + rep.party + '</span>' + '</li>'
            reps += '<li>' + '<i class="tiny material-icons">' + 'call' + '&nbsp' + '&nbsp' + '</i>' + rep.phone + '</li>'
            reps += '<li>' + '<i class="tiny material-icons">' + 'email' + '&nbsp' + '&nbsp' + '</i>' + '<a href="mailto:">'+ rep.oc_email + '</a>'+'</li>'
            reps += '<li>' + "Twitter: " + rep.twitter_id + '</li>'
            reps += '<li>' + "Facebook: " + rep.facebook_id + '</li>'
						reps += '<a href="' + rep.website + '" target="_blank">' + "Official Website"+ '</a>'
						reps += '</ul>'
            reps += '</div>'

					}
          else if ('house' === rep.chamber.toLowerCase()) {
            reps += '<div class="card-panel  light-blue darken-2">'
            reps += '<ul>'
						reps += '<h4>'+ rep.first_name + ' ' + rep.last_name + '</h4>'
            reps += '<li>' + '<span>' + rep.title + ' - ' + rep.state_name + ' - ' + rep.party + '</span>' + '</li>'
            reps += '<li>' + '<i class="tiny material-icons">' + 'call' + '&nbsp' + '&nbsp' + '</i>' + rep.phone + '</li>'
            reps += '<li>' + '<i class="tiny material-icons">' + 'email' + '&nbsp' + '&nbsp' + '</i>' + rep.oc_email + '</li>'
            reps += '<li>' + "Twitter: " + rep.twitter_id + '</li>'
            reps += '<li>' + "Facebook: " + rep.facebook_id + '</li>'
						reps += '<a href="' + rep.website + '" target="_blank">' + "Official Website"+ '</a>'
            reps += '</ul>'
            reps += '</div>'
          }
				})

				$results.html(reps)
			} else {
				$results.html('<h5 class="error-msg">'+'Could not locate Representatives near zip code ' + zipCode + '. Please try again.'+'</h5>')
			}
		})
	})
})
