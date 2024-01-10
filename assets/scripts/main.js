const cookies = {
    setCookie(name, value, daysToExpire) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + daysToExpire);
      
        const cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/`;
        
        document.cookie = cookieString;
      },
      getCookie(name) {
        const cookies = document.cookie.split('; ');
      
        for (const cookie of cookies) {
          const [cookieName, cookieValue] = cookie.split('=');
      
          if (decodeURIComponent(cookieName) === name) {
            return decodeURIComponent(cookieValue);
          }
        }
      
        return null;
      }
}

document.addEventListener('DOMContentLoaded', () => {
    const popupStatus = cookies.getCookie('popup-closed')

    if (!popupStatus) {
        const popup = document.getElementById('popup');
        const closePopupButton = document.getElementById('close-popup')

        function handleIntersection(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.classList.remove('hidden');
                    observer.unobserve(entry.target);
                } else {
                    entry.target.classList.remove('visible');
                    entry.target.classList.add('hidden');
                }
            });
        }
        
        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5,
        });
        
        
        observer.observe(popup);

        closePopupButton.addEventListener('click', () => {
            popup.classList.remove('visible');
            popup.classList.add('hidden')
            cookies.setCookie('popup-closed', true, 1)
        })
    } else {
        popup.classList.add('hidden')
    }
})

