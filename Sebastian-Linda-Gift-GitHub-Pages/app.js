const trips = {
  maastricht: {
    index: "01", kicker: "Weekend one · Friday to Sunday", title: "Cologne →<br>Valkenburg<br>& Maastricht",
    subtitle: "Friday gets us there. The actual gift begins on Saturday in Limburg.", position: "left 26%",
    stamp: "Weekend",
    quote: "“Cologne is the travel-day bonus. Saturday and Sunday are the actual gift.”",
    when: "Friday 23 – Sunday 25 October 2026", stayLabel: "Sleeping", stay: "Friday at Michael’s (travel-day bonus) + Saturday at a hotel in Landgraaf, close to Luigi’s", travel: "Two cars: Cologne → Valkenburg → Belgium/Landgraaf → Maastricht",
    included: "Demise of the Gricers tickets for Basti + MergelRijk tickets for everyone + dinner at Luigi’s + hotel in Landgraaf",
    days: [
      {
        type: "travel", time: "Friday 23rd", eyebrow: "Travel day · not part of the gift", title: "Cologne is conveniently on the way", copy: "We leave work by 14:00, switch off your screen, stop building rockets Mr Engineer, and drive both our cars to Cologne—perhaps with a fun stop on the way. Then we join Michael’s 40th birthday, follow whatever plan he has organised and sleep at his place. A lovely bonus, but officially not our gift."
      },
      ["Saturday", "Now the actual gift begins", "We continue into Limburg for the part Nikki and Stefano have actually planned."],
      ["Morning", "Valkenburg’s old town", "Coffee among the beautiful streets, with time for the Kasteelruïne and the Valkenburg Rodelbahn."],
      {
        type: "feature", time: "Together", eyebrow: "Full group · tickets included", title: "MergelRijk", copy: "We all head underground for an interactive cave experience filled with local history, 3D cave art, sculptures and hands-on activities for adults and children.", action: "open-mergelrijk", actionLabel: "Explore inside MergelRijk →"
      },
      {
        type: "split", time: "Then we split", title: "Two cars. Two very different adventures.", routes: [
          { group: "The boys · Car one", title: "Belgium: Demise of the Gricers", copy: "We drive to Belgium as a small team for our birthday gift to Basti: hours of immersive, physical horror inside an abandoned railway depot.", action: "open-gricers", actionLabel: "Enter Demise of the Gricers →" },
          { group: "Girls + kids · Car two", title: "Lunch, shopping & check-in", copy: "They’ll do lunch and shopping, then check in at our hotel in Landgraaf, close to Luigi’s. We’ll spend no time there—it really is just a place to sleep. (Basti: BattleKart is only a six-minute drive away.)" }
        ]
      },
      ["Evening", "A dinner worth regrouping for", "We’ll have dinner in Landgraaf, near the hotel, at lovely <a href=\"https://www.by-flow.com/de/restaurants/luigis\" target=\"_blank\" rel=\"noreferrer\">Luigi’s</a>—fancy Italian in a vaulted wine cellar."],
      ["Sunday 25th", "Breakfast & Maastricht", "Breakfast, followed by a casual stroll through Maastricht. We’ll leave around lunchtime."]
    ]
  }
};

// Shelved for later: the complete Milano plan remains intact and can be restored.
const shelvedTrips = {
  milano: {
    index: "03", kicker: "Part three · November", title: "Milano",
    subtitle: "Duomo glamour, aperitivo hour and a night beside the canals.", position: "right center",
    stamp: "Weekend",
    quote: "“Espresso. Panzerotti. Brera at golden hour. Crazy Pizza after dark. This is Milano.”",
    when: "14–15 or 21–22 November", stayLabel: "Stay", stay: "Accommodation in Milan city centre",
    travel: "We pick you up, drive to Frankfurt Airport and take care of parking",
    included: "Pickup + airport parking + return flights + accommodation + Crazy Pizza dinner",
    dateOptions: [
      { label: "14–15 Nov", note: "Weekend one" },
      { label: "21–22 Nov", note: "Weekend two" }
    ],
    days: [
      ["Saturday", "Door-to-door to Milano", "We pick you up, drive to Frankfurt Airport, park the car and fly together to Milan. Your city-centre stay is waiting."],
      ["12:00", "Duomo glamour & legendary street food", "Take in Piazza del Duomo and the Galleria, then begin properly with warm, mozzarella-filled panzerotti from Luini."],
      ["15:00", "Brera in cinematic autumn", "Cobbled lanes, tiny galleries and beautiful boutiques in Milan’s most charming, effortlessly stylish quarter."],
      ["18:00", "The aperitivo ritual", "A Negroni Sbagliato or classic Spritz, little bites and perhaps a ride on one of Milan’s historic wooden trams."],
      ["20:30", "Crazy Pizza & Navigli after dark", "Dinner at Crazy Pizza Milano Centro—then games, cocktails, music and canal-side nightlife for as long as we fancy."],
      ["Sunday", "Espresso, fortress & fashion", "Cornetti and strong coffee, Castello Sforzesco, Parco Sempione and a little window-shopping in the golden fashion district."],
      ["Lunch", "One last taste of Lombardia", "A relaxed Sunday lunch, a glass of Franciacorta and time for Panettone or another delicious souvenir before flying home."]
    ]
  }
};

const screens = [...document.querySelectorAll(".screen")];
let currentTrip = "maastricht";
let selectedDate = "";
const quizAnswers = ["wedgie", "veggie", "wedgie"];
const quizSolved = [false, false, false];
let transformTimer;

function showScreen(id) {
  document.querySelectorAll("audio").forEach(audio => { audio.pause(); audio.currentTime = 0; });
  screens.forEach(screen => screen.classList.toggle("active", screen.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetQuiz() {
  quizSolved.fill(false);
  document.getElementById("quiz-progress").textContent = "0 / 3 correct";
  document.querySelectorAll(".quiz-row").forEach(row => {
    row.classList.remove("correct");
    row.querySelectorAll("[data-answer]").forEach(button => {
      button.disabled = true;
      button.classList.remove("selected");
    });
    const play = row.querySelector("[data-play]");
    play.classList.remove("playing");
    play.innerHTML = '<span class="play-icon">▶</span> Play';
  });
}

function playMadridTransform() {
  const screen = document.getElementById("madrid-alsace");
  window.clearTimeout(transformTimer);
  screen.classList.remove("running", "revealed");
  showScreen("madrid-alsace");
  void screen.offsetWidth;
  screen.classList.add("running");
  const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 50 : 10900;
  transformTimer = window.setTimeout(() => screen.classList.add("revealed"), delay);
}

function renderTrip(key) {
  currentTrip = key;
  const trip = trips[key];
  document.getElementById("detail-count").textContent = `${trip.index} / 02`;
  document.getElementById("detail-kicker").textContent = trip.kicker;
  document.getElementById("stamp-number").textContent = trip.index;
  document.getElementById("stamp-bottom").textContent = trip.stamp;
  document.getElementById("detail-title").innerHTML = trip.title;
  document.getElementById("detail-subtitle").textContent = trip.subtitle;
  document.getElementById("detail-quote").textContent = trip.quote;
  document.getElementById("detail-when").textContent = trip.when;
  document.getElementById("detail-stay-label").textContent = trip.stayLabel;
  document.getElementById("detail-stay").textContent = trip.stay;
  document.getElementById("detail-travel").textContent = trip.travel;
  document.getElementById("detail-includes").textContent = trip.included;
  document.getElementById("detail-hero").style.setProperty("--hero-position", trip.position);
  document.getElementById("itinerary").innerHTML = trip.days.map(item => {
    if (item.type === "feature") return `
      <article class="itinerary-feature">
        <div>
          <strong>${item.time}</strong>
          <span>${item.eyebrow}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.copy}</p>
        <button data-action="${item.action}">${item.actionLabel}</button>
      </article>`;
    if (item.type === "travel") return `
      <article class="travel-note">
        <div><strong>${item.time}</strong><span>${item.eyebrow}</span></div>
        <h3>${item.title}</h3>
        <p>${item.copy}</p>
      </article>`;
    if (item.type === "split") return `
      <section class="route-split">
        <div class="route-split-heading"><strong>${item.time}</strong><h3>${item.title}</h3></div>
        <div class="route-grid">
          ${item.routes.map(route => `
            <article class="route-card">
              <span>${route.group}</span>
              <h4>${route.title}</h4>
              <p>${route.copy}</p>
              ${route.action
                ? `<button data-action="${route.action}">${route.actionLabel}</button>`
                : route.href
                  ? `<a href="${route.href}" target="_blank" rel="noreferrer">${route.actionLabel}</a>`
                  : ""}
            </article>
          `).join("")}
        </div>
      </section>`;
    const [day, title, copy] = item;
    return `<article class="day"><strong>${day}</strong><div><h3>${title}</h3><p>${copy}</p></div></article>`;
  }).join("");
  const datePicker = document.getElementById("date-picker");
  const dateOptions = document.getElementById("date-options");
  datePicker.hidden = !trip.dateOptions;
  selectedDate = "";
  dateOptions.innerHTML = (trip.dateOptions || []).map(option => `
    <button class="date-option" data-date="${option.label}" aria-pressed="false">${option.label}<span>${option.note}</span></button>
  `).join("");
  document.querySelectorAll("[data-jump]").forEach(button => button.classList.toggle("active", button.dataset.jump === key));
  showScreen("detail");
}

document.addEventListener("click", event => {
  const tripButton = event.target.closest("[data-trip]");
  const jumpButton = event.target.closest("[data-jump]");
  const actionButton = event.target.closest("[data-action]");
  const dateButton = event.target.closest("[data-date]");
  const playButton = event.target.closest("[data-play]");
  const answerButton = event.target.closest("[data-answer]");
  if (tripButton) renderTrip(tripButton.dataset.trip);
  if (jumpButton) renderTrip(jumpButton.dataset.jump);
  if (playButton) {
    const row = playButton.closest(".quiz-row");
    const audio = row.querySelector("audio");
    document.querySelectorAll("audio").forEach(item => { if (item !== audio) { item.pause(); item.currentTime = 0; } });
    document.querySelectorAll(".play-button").forEach(button => { if (button !== playButton) { button.classList.remove("playing"); button.innerHTML = '<span class="play-icon">▶</span> Play'; } });
    audio.currentTime = 0;
    audio.play();
    playButton.classList.add("playing");
    playButton.innerHTML = '<span class="play-icon">■</span> Playing';
    row.querySelectorAll("[data-answer]").forEach(button => button.disabled = false);
    audio.onended = () => {
      playButton.classList.remove("playing");
      playButton.innerHTML = '<span class="play-icon">▶</span> Replay';
    };
  }
  if (answerButton) {
    const row = answerButton.closest(".quiz-row");
    const round = Number(row.dataset.round);
    if (answerButton.dataset.answer !== quizAnswers[round]) {
      showScreen("quiz-fail");
      return;
    }
    quizSolved[round] = true;
    row.classList.add("correct");
    row.querySelectorAll("[data-answer]").forEach(button => {
      button.disabled = true;
      button.classList.toggle("selected", button === answerButton);
    });
    const score = quizSolved.filter(Boolean).length;
    document.getElementById("quiz-progress").textContent = `${score} / 3 correct`;
    if (score === 3) setTimeout(playMadridTransform, 700);
  }
  if (dateButton) {
    selectedDate = dateButton.dataset.date;
    document.querySelectorAll("[data-date]").forEach(button => {
      const isActive = button === dateButton;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === "open-gift") { resetQuiz(); showScreen("quiz"); }
  if (action === "home") showScreen("cover");
  if (action === "retry") { resetQuiz(); showScreen("quiz"); }
  if (action === "back") showScreen("chooser");
  if (action === "madrid-transform" || action === "restart-transform") playMadridTransform();
  if (action === "finish-transform") document.getElementById("madrid-alsace").classList.add("revealed");
  if (action === "show-replacements") showScreen("chooser");
  if (action === "open-alsace") showScreen("alsace-weekend");
  if (action === "open-mergelrijk") showScreen("mergelrijk");
  if (action === "open-gricers") showScreen("gricers");
  if (action === "back-maastricht") renderTrip("maastricht");
});
