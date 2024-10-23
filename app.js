(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        });
    });

    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });


    const form = document.getElementById('contact-form');
    const responseDiv = document.getElementById('response');

    form.addEventListener('submit', function(event) {
      event.preventDefault();  // Prevent form from reloading the page

      const formData = new FormData(form);
      
      // Convert form data to a URL-encoded string
      const data = new URLSearchParams();
      for (const pair of formData) {
        data.append(pair[0], pair[1]);
      }

      fetch('https://script.google.com/macros/s/AKfycbx-NLWGwfVbR3sb9zjNWKIqZvoyIJ71HcPu9XXaPSv56yum9tjm6Lzm_WaSevMksrVf/exec', {
        method: 'POST',
        body: data,
      })
      .then(response => response.text())
      .then(text => {
        // Show a success message with user details
        responseDiv.className = 'message-box success';
        responseDiv.innerHTML = `
          <strong>Thank you, ${formData.get('name')}!</strong><br>
          Your message has been received.<br>
          We'll get back to you at <strong>${formData.get('email')}</strong> regarding <strong>${formData.get('subject')}</strong>.
        `;
        responseDiv.classList.remove('hidden');
        form.reset();  // Reset the form after submission
      })
      .catch(error => {
        responseDiv.className = 'message-box error';
        responseDiv.textContent = 'There was an error submitting the form. Please try again.';
        responseDiv.classList.remove('hidden');
      });
    });

})();


