// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "Tabletop and digital games. Designer, narrative, audio, and creative-lead work.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-a-year-in-review",
        
          title: "A Year In Review",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/a-year-in-review/";
          
        },
      },{id: "post-roll20-marketplace-aspirations",
        
          title: "Roll20 Marketplace Aspirations",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/roll20-marketplace-aspirations/";
          
        },
      },{id: "post-wanderer-s-guide-to-prosgia",
        
          title: "Wanderer’s Guide to Prosgia",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/wanderers-guide-to-prosgia/";
          
        },
      },{id: "post-written-in-ink",
        
          title: "Written In Ink",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/written-in-ink/";
          
        },
      },{id: "post-summer-prospects",
        
          title: "Summer Prospects",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/summer-prospects/";
          
        },
      },{id: "post-acolyte-postmortem",
        
          title: "Acolyte Postmortem",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/acolyte-postmortem/";
          
        },
      },{id: "post-acolyte",
        
          title: "Acolyte",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/acolyte/";
          
        },
      },{id: "post-battlemap-iteration",
        
          title: "Battlemap Iteration",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/battlemap-iteration/";
          
        },
      },{id: "post-naughty-or-nice",
        
          title: "Naughty Or Nice",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/naughty-or-nice/";
          
        },
      },{id: "post-godot-and-game-development",
        
          title: "Godot and Game Development",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/godot-and-game-development/";
          
        },
      },{id: "post-dungeondraft-mapmaking-and-adventure-design",
        
          title: "Dungeondraft, Mapmaking, and Adventure Design",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/dungeondraft-mapmaking-and-adventure-design/";
          
        },
      },{id: "post-jojo-the-flying-cat-mod",
        
          title: "Jojo, The Flying Cat Mod",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/jojo-the-flying-cat-mod/";
          
        },
      },{id: "post-tabletop-simulator-and-playtesting",
        
          title: "Tabletop Simulator and Playtesting",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/tabletop-simulator-and-playtesting/";
          
        },
      },{id: "post-machinations-and-game-design-tools",
        
          title: "Machinations and Game Design Tools",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/machinations-and-game-design-tools/";
          
        },
      },{id: "post-marianne-s-paralogue-and-character-expectations",
        
          title: "Marianne’s Paralogue and Character Expectations",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/mariannes-paralogue-and-character-expectations/";
          
        },
      },{id: "post-first-ever-encounter",
        
          title: "First Ever Encounter!",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/first-ever-encounter/";
          
        },
      },{id: "post-battle-brothers-the-tale-of-sun-s-end-company",
        
          title: "Battle Brothers – The Tale of Sun’s End Company",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/battle-brothers-the-tale-of-suns-end-company/";
          
        },
      },{id: "post-mount-amp-blade-the-ultimate-medieval-low-fantasy-sandbox",
        
          title: "Mount &amp; Blade: The Ultimate Medieval/Low-Fantasy Sandbox",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/mount-blade-is-there-any-better-way-to-start-a-game-design-blog/";
          
        },
      },{id: "projects-acolyte",
          title: 'Acolyte',
          description: "Indie TTRPG about apprentice wizards on their graduation quest.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/acolyte/";
            },},{id: "projects-lost-in-translation",
          title: 'Lost in Translation',
          description: "Short choose-your-own-adventure game. Writer and sound designer.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/lost-in-translation/";
            },},{id: "projects-plane-disappointment",
          title: 'Plane Disappointment',
          description: "Endless runner. Programmer and sound designer.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/plane-disappointment/";
            },},{id: "projects-seventino-midnight-cafe",
          title: 'Seventino Midnight Cafe',
          description: "Cooking game with hunting mechanic. Writer.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/seventino-midnight-cafe/";
            },},{id: "projects-ttrpg-battlemaps",
          title: 'TTRPG Battlemaps',
          description: "16-map gallery of grid-ready battlemaps for tabletop role-playing.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/ttrpg-battlemaps/";
            },},{id: "projects-wanderer-39-s-guide-to-prosgia",
          title: 'Wanderer&amp;#39;s Guide to Prosgia',
          description: "5th-edition TTRPG supplement. Creative lead on a 10-person team.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/wanderers-guide-to-prosgia/";
            },},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
