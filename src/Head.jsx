import React from 'react'

const Head = () => {
  return (
    <section className = " pt-[4rem]  flex flex-col justify-center gap-4 items-center">
    <h1 className=" head_text text-white text-center">
        Discover Amazing Movies {" "}
        <br className="max-md:hidden *" />
        <span className="orange_gradient text-center">Built with OMDB API</span>
    </h1>
    <p className="desc text-center">
    Browse through lots of movies here, just type the name of the movie and it will be displayed on your screen
    </p>
</section>
  )
}

export default Head