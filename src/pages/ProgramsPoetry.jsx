const winners = [
  { title: "Fly", author: "Iris Colman", grade: "Kindergarten", school: "Lowell Elementary School (Watertown)", category: "Grades K–3", lines: ["Birdy birdy fly up high!", "“No, my dear, I cannot fly.”", "I got it! You can fly with leaves!", "“Thank you, thank you! Fly with me!”"] },
  { title: "Birds and Bees are Singing", author: "Ava Miller", grade: "Grade 7", school: "Belmont Upper Middle School", category: "Grades 7–8", lines: ["The birds and bees are singing.", "The branches on trees are swaying.", "The people are laughing and having fun,", "underneath the hot, hot sun.", "The insects are crawling", "as the leaves start falling."] },
  { title: "What It Becomes", author: "Sahana Arun", grade: "Grade 5", school: "Chenery Upper Elementary School", category: "Grades 4–6", lines: ["I make my way to a place that they all whisper about", "As I get closer and closer, I hear something loud and pause. “Thunder,” I say as I define the noise as rumbling", "When I get to the place I see nothing but land with puddles forming everywhere", "I surrender to the rain beating down on me hard. I decide to make the long journey home", "Weeks pass as I visit this place that’s forming and growing every minute", "I realize it’s not about what it was but what it becomes", "The flowers dance, the bluebirds sing, as I take in my surroundings", "I see sweet pepperbush, the fragrant flowers drawing me closer", "Finally when I’m about to leave, I get the best surprise of all", "I see more of what I am, duplicates of me: a monarch butterfly."] },
  { title: "An Autumn Forest", author: "Kaelyn Shen", grade: "Grade 7", school: "Belmont Upper Middle School", category: "Grades 7–8", lines: ["As Autumn leaves turn golden", "Trees wave in the wind", "Squirrels and chipmunks scamper through", "Butterflies and Bees flutter about", "Forest towering above our heads", "Saplings take root in rich soil", "Leaves turn golden and fall from the branches", "The forest thrives through the seasons"] },
  { title: "The Metaphor", author: "Ava Sherman", grade: "Grade 9", school: "Boston University Academy", category: "Grades 9–10", lines: ["The first time I saw the forest, I was walking down the road around the lake with my mom", "It was not a forest, really, but a mass of dirt and a lady and several students getting dirty in it", "This was meant to be a forest, the lady told us, and the trees here were being planted close together to grow faster; they would be fully grown by the time we graduated.", "", "And every time I twirled around that path during recess, or pet dogs or made mini snowmen,", "The trees were there, watching, growing, until a year had passed and you saw them anew.", "", "The first time I saw the forest, it was a mix of love and dirt and saplings,", "Pushing, full of love and light and hope, refusing to give in with so much sunshine to be had", "An example, and a friend, and a metaphor.", "It is my pleasure to grow with you, mini-forest."] },
  { title: "Rebirth", author: "Zoé Marion", grade: "Grade 12", school: "Belmont High School", category: "Grades 11–13", lines: ["Look down! The rotten flesh of the forest", "convenes on the immense, meddlesome roots", "that prowl the dusky floor. Feathered guts", "confide with maple leaves,", "who bloomed and greened and blazed,", "but are now charcoaled and molded. They speak so quietly,", "you cannot hear them. Except for when the wind breaks and the birds sleep and the ants descend deep", "into the earth.", "Then you can make out their whooping hollers. They mock us because", "they know what burgeons underneath."] },
];

const honorableMentions = [
  { title: "Belmont’s Miyawaki Forest", author: "Sullivan Troiano", grade: "Grade 2", school: "Home School", category: "Grades K–3", lines: ["Our Miyawaki Forest is important to me", "Because I planted one of the trees.", "After a summer of caring for the gray dogwood", "As best as anyone could,", "On a hot October day, with my cousin,", "We put the gray dogwood in,", "Along with hundreds of people", "Planting trees the size of sticks,", "That now are taller than me,", "Green as far as the eye can see."] },
  { title: "Lovely Mini-Forest", author: "Noelle Shen", grade: "Grade 5", school: "Chenery Upper Elementary School", category: "Grades 4–6", lines: ["Worms wiggle in their new home in the mini forest", "People planting saplings, new roots digging deep into the earth's rich soil", "Tree leaves touching close together", "Some trees holding hands", "All growing up together", "Leaves of all different sizes some bigger than my head some smaller than my hand", "Trees so tall they look down on me now.", "Birds sing their lovely song to the mini forest."] },
  { title: "Peaceful Moment", author: "Elodie Luce", grade: "Grade 6", school: "Chenery Upper Elementary School", category: "Grades 4–6", lines: ["Sitting under my cherry blossom", "I watch the fading sunlight glow", "And let the peaceful moment flow"] },
  { title: "The Dove Tree", author: "Yifei Tang", grade: "Grade 9", school: "Belmont High School", category: "Grades 9–10", lines: ["Hundreds of pairs.", "Their flight paused.", "Ivory tails drape,", "in a sage", "sanctuary.", "The eyes never blink,", "watching.", "You leave,", "the doves sigh,", "and continue the journey."] },
  { title: "Standard Deviation", author: "Alice Song", grade: "Grade 10", school: "Belmont High School", category: "Grades 9–10", lines: ["shows just how far I am from the sun,", "growing in the opposite direction", "deep down to my roots.", "", "And I can do plenty,", "mulling, digesting, controlled mastery;", "unable to prove it, why do I try,", "it can’t be seen anyway."] },
  { title: "The Oak", author: "Megan Espelin", grade: "Grade 12", school: "Belmont High School", category: "Grades 11–13", lines: ["Past the others, We sit beneath", "The leaves that cover", "What once was heath.", "", "Now with plots, Shiny; neat", "I see the old ‘neath obsolete", "", "Will they notice?", "The Oak’s defeat", "Strong and curious, roots buried deep", "", "Twirling late on a summer’s eve", "Will this tree be next to leave?"] },
];

const winnerColumns = [
  [winners[0], winners[2], winners[5]],
  [winners[1], winners[3], winners[4]],
];

const honorableMentionColumns = [
  [honorableMentions[0], honorableMentions[2], honorableMentions[5]],
  [honorableMentions[1], honorableMentions[3], honorableMentions[4]],
];

function PoemCard({ poem, result }) {
  return (
    <article className="poetry-result-card">
      <div className="poetry-result-label">{result} · {poem.category}</div>
      <h3>{poem.title}</h3>
      <p className="poetry-author">
        <strong>{poem.author}</strong> · {poem.grade}
        <br />
        {poem.school}
      </p>
      <div className="poetry-text">
        {poem.lines.map((line, index) =>
          line === "" ? <br key={index} /> : <div key={index}>{line}</div>
        )}
      </div>
    </article>
  );
}

function ProgramsPoetry() {
  return (
    <div>
      <section className="poetry-results-section">
        <div className="container">
          <div className="poetry-results-intro">
            <p className="poetry-results-kicker">Miyawaki Forest Action Belmont</p>
            <h1>2026 Mini-Poetry Contest</h1>
            <p className="poetry-results-subtitle">Winners &amp; Honorable Mentions</p>
            <p className="poetry-results-intro-copy">
              Thank you to all of the students who shared their creativity and
              observations of the natural world with us. Congratulations to this
              year&apos;s poets!
            </p>
          </div>

          <div className="poetry-group">
            <h2>Winners</h2>
            <div className="poetry-results-grid">
              {winnerColumns.map((column, columnIndex) => (
                <div className="poetry-results-column" key={columnIndex}>
                  {column.map((poem) => (
                    <PoemCard
                      key={poem.title}
                      poem={poem}
                      result={poem.category === "Grades 7–8" ? "Co-Winner" : "Winner"}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="poetry-group">
            <h2>Honorable Mentions</h2>
            <div className="poetry-results-grid">
              {honorableMentionColumns.map((column, columnIndex) => (
                <div className="poetry-results-column" key={columnIndex}>
                  {column.map((poem) => (
                    <PoemCard
                      key={poem.title}
                      poem={poem}
                      result="Honorable Mention"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProgramsPoetry;
