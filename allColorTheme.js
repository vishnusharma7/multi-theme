// create element of theme and theme dropdown

const themeDropdown = document.createElement("div");
themeDropdown.classList.add("theme-dropdown");

const themeChangers = document.createElement("div");
themeChangers.classList.add("theme-changers");
themeChangers.id = "theme-button";

const themesText = document.createElement("div");
themesText.classList.add("themes-text");

// Create an SVG element which is fixed at right position
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
svg.setAttribute("width", "20");
svg.setAttribute("height", "20");
svg.setAttribute("fill", "currentColor");
svg.classList.add("bi", "bi-palette-fill");
svg.setAttribute("viewBox", "0 0 16 16");


const path = document.createElementNS("http://www.w3.org/2000/svg", "path",);
path.setAttribute("d","M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07zM8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z");


svg.appendChild(path);


themesText.appendChild(svg);

themeChangers.appendChild(themesText);


const themeList = document.createElement("ul");
themeList.classList.add("theme-list");
themeList.id = "theme-list";

// store the colors of circle icons
const themesData = [
    { theme: "default", color: "#0c87c9" },
    { theme: "orange", color: "#ff5740" },
  { theme: "purple", color: "#6B4EFF" },
  { theme: "dim-blue", color: "#0a5b75" },
  { theme: "teal-green", color: "#18da8e" },
  { theme: "blue", color: "#2156fa" },
  { theme: "light-green", color: "#beef00" },
  { theme: "light-orange", color: "#ff1e00" },

];

// Create list items with data-theme and style
themesData.forEach((data) => {
  const listItem = document.createElement("li");
  listItem.setAttribute("data-theme", data.theme);

  const themeCircle = document.createElement("div");
  themeCircle.classList.add("theme-circle");
  themeCircle.style.backgroundColor = data.color;

  listItem.appendChild(themeCircle);
  themeList.appendChild(listItem);
});

themeDropdown.appendChild(themeChangers);
themeDropdown.appendChild(themeList);

// Append the theme-dropdown container to the document body
document.body.appendChild(themeDropdown);


const themes = [
    {
        name: 'default',
        colors: {
            '--primary-color': '#0c87c9',
            
        },
    },
    {
        name: 'orange',
        colors: {
            '--primary-color': '#ff5740',
            
        },
    },
    {
        name: 'purple',
        colors: {
            '--primary-color': '#6B4EFF',
           
        },
    },
    {
        name: 'dim-blue',
        colors: {
            '--primary-color': '#0a5b75',
           
        },
    },
    {
        name: 'teal-green',
        colors: {
            '--primary-color': '#18da8e',
           
        },
    },
    {
        name: 'blue',
        colors: {
            '--primary-color': '#2156fa',
           
        },
    },
    {
        name: 'light-green',
        colors: {
            '--primary-color': '#beef00',
           
        },
    },
    {
        name: 'light-orange',
        colors: {
            '--primary-color': '#ff1e00',
           
        },
    },
   
];

let currentThemeIndex = 0;

// Function to apply a selected theme 
function applyTheme(themeIndex) {
    const root = document.documentElement;
    currentThemeIndex = themeIndex;
    const currentTheme = themes[currentThemeIndex];
    
    for (const [property, value] of Object.entries(currentTheme.colors)) {
        root.style.setProperty(property, value);
    }
    const svgIcon = document.querySelector(".bi-palette-fill");
    svgIcon.style.color = getComputedStyle(root).getPropertyValue("--primary-color");

    // Saving in the local storage
    localStorage.setItem('selectedThemeIndex', themeIndex);
}

// Function to toggle the theme dropdown visibility
function toggleDropdown() {
    const themeList = document.getElementById('theme-list');
    themeList.classList.toggle('show');
}

// Attach a click event listener to the theme button
const themeButton = document.getElementById('theme-button');
themeButton.addEventListener('click', toggleDropdown);

// Attach click event listeners to the theme options in the dropdown
const themeListItems = document.querySelectorAll('.theme-list li');
themeListItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        applyTheme(index);
        toggleDropdown();
    });
});

// Load the selected theme index from localStorage on page load
const savedThemeIndex = localStorage.getItem('selectedThemeIndex');
if (savedThemeIndex !== null) {
    applyTheme(parseInt(savedThemeIndex));
} else {
    // Use the default theme if no selection is stored
    applyTheme(currentThemeIndex);
}

