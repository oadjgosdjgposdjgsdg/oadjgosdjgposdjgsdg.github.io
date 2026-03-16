function loadComponent(url, elementId) {
  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${url}`);
      return res.text();
    })
    .then(html => {
      const container = document.getElementById(elementId);
      container.innerHTML = html;

      container.querySelectorAll("script").forEach(oldScript => {
        const newScript = document.createElement("script");
        newScript.textContent = oldScript.textContent;
        document.body.appendChild(newScript);
        oldScript.remove();
      });
    })
    .catch(err => console.error(err));
}

loadComponent("components/navbar.html", "navbar");
loadComponent("components/footer.html", "footer");
