import React from "react";

function Project() {
  return (
    <>
      <section className="projects" id="projects">
        <div className="max-width">
          <h2 className="title">My Projects</h2>
          <div className="carousel owl-carousel">
            <div className="card">
              <div className="box">
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04"
                  alt=""
                />
                <div className="text">Ecommerce</div>
                <p>
                  SHOPZEN application:-It that allows users to browse, purchase,
                  and manage orders for products or services.
                </p>
                <div class="wrap">
                  <div class="fill-wrap">
                    <a href="https://shpzen.vercel.app/login" class="btn btn-color btn-l-r">View project</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
                  alt=""
                />
                <div className="text">Animation Page</div>
                <p>
                  Animation Landing page:- Their are some picture that animate
                  when click on that picture.
                </p>
                  <div class="wrap" id="animation">
                  <div class="fill-wrap">
                    <a href="https://annimation.vercel.app/" class="btn btn-color btn-l-r">View project</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <img
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D"
                  alt=""
                />
                <div className="text">Text App </div>
                <p>
                  TextUtils app:-In that project we can convert the text
                  uppercase,lowercase,copy,remove all and,enable the dark mode.
                </p>
                <div class="wrap">
                  <div class="fill-wrap">
                    <a href="https://textutils-wheat-nu.vercel.app/" class="btn btn-color btn-l-r">View project</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <img
                  src="https://images.unsplash.com/photo-1521931961826-fe48677230a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWVzc2FnaW5nJTIwQXBwfGVufDB8fDB8fHww"
                  alt=""
                />
                <div className="text">Instagram clone</div>
                <p>
                  Instagram clone:-not added all feature of instagram.user can
                  register,login,update details.user can post.
                </p>
                <div class="wrap">
                  <div class="fill-wrap">
                    <a href="https://github.com/zademanish/InstaClone.git" class="btn btn-color btn-l-r">Source code</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <img
                  src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2xvbmUlMjBhcHB8ZW58MHx8MHx8fDA%3D"
                  alt=""
                />
                <div className="text">Demo</div>
                <p>
                  #Project Details:-Lorem ipsum dolor sit amet consectetur
                  adipisicing elit.Lorem ipsum dolor sit amet consectetur
                  adipisicing elit.
                </p>
                <div class="wrap">
                  <div class="fill-wrap">
                    <a href="#" class="btn btn-color btn-l-r">No project</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <img
                  src="https://images.unsplash.com/photo-1541877944-ac82a091518a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fERlbW8lMjBhcHB8ZW58MHx8MHx8fDA%3D"
                  alt=""
                />
                <div className="text">Demo</div>
                <p>
                  #Project Details:- Lorem ipsum dolor sit amet consectetur
                  adipisicing elit.Lorem ipsum dolor sit amet consectetur
                  adipisicing elit.
                </p>
                <div class="wrap">
                  <div class="fill-wrap">
                    <a href="#" class="btn btn-color btn-l-r">No project</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Project;
