
import React from "react";
import "./footer.css";
import { Helmet } from "react-helmet";

class Footer extends React.Component {
    render() {
        return (

            <div class="Parent_error_class">
                <div className="application">
                    <head>
                        <Helmet>
                            <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css' />
                            <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css' />
                            <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css' />
                            <link rel='stylesheet' href='https://themify.me/wp-content/themes/themify-v32/themify-icons/themify-icons.css'/>
                            {/* <link rel="stylesheet" href="./footer.css" /> */}

                </Helmet>
            </head>
        </div>
        
                    <footer class="new_footer_area bg_color">
                        <div class="new_footer_top">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-3 col-md-6">
                                        <div class="f_widget company_widget wow fadeInLeft" data-wow-delay="0.2s" style={{ visibility: "visible", animationDelay: "0.2s", animationName: "fadeInLeft" }}>
                                         
                                            <form action="#" class="f_subscribe_two mailchimp" method="post" >
                    
                                            </form>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-6">
                                        <div class="f_widget about-widget pl_70 wow fadeInLeft" data-wow-delay="0.4s" style={{ visibility: "visible", animationDelay: "0.4s", animationName: "fadeInLeft" }}>
                                            
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-6">
                                        <div class="f_widget about-widget pl_70 wow fadeInLeft" data-wow-delay="0.6s" style={{ visibility: "visible", animationDelay: "0.6s", animationName: "fadeInLeft" }}>
                                           
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-6">
                                        <div class="f_widget social-widget pl_70 wow fadeInLeft" data-wow-delay="0.8s" style={{ visibility: "visible", animationDelay: "0.8s", animationName: "fadeInLeft" }}>
                                            <h3 class="f-title f_600 t_color f_size_18">Team Solutions</h3>
                                            <div class="f_social_icon">
                                                <a href="http://www.facebook.com" class="fab fa-facebook"></a>
                                                <a href="http://www.twitter.com" class="fab fa-twitter"></a>
                                                <a href="http://www.linkedin.com" class="fab fa-linkedin"></a>
                                                <a href="http://www.pinterest.com" class="fab fa-pinterest"></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="footer_bg">
                                <div class="footer_bg_one"></div>
                                <div class="footer_bg_two"></div>
                            </div>
                        </div>
                        <div class="footer_bottom">
                            <div class="container">
                                <div class="row align-items-center">
                                    <div class="col-lg-6 col-sm-7">
                                        <p class="mb-0 f_400">© ISI Inc.. 2020 All rights reserved.</p>
                                    </div>
                                    <div class="col-lg-6 col-sm-5 text-right">
                                        <p>Made <i class="icon_heart"></i> by <a href="#">TEAM A</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>

                );
              }
            }
            export default Footer;
