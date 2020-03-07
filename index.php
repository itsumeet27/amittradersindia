<?php include ('includes/header.php');?>

    <!-- Start your project here-->  

        <!--Carousel Wrapper-->
            <div id="carousel-example-1z" class="carousel slide carousel-fade" data-ride="carousel">
            <!--Indicators-->
            <ol class="carousel-indicators">
                <li data-target="#carousel-example-1z" data-slide-to="0" class="active"></li>
                <li data-target="#carousel-example-1z" data-slide-to="1"></li>
                <li data-target="#carousel-example-1z" data-slide-to="2"></li>
            </ol>
            <!--/.Indicators-->
            <!--Slides-->
            <div class="carousel-inner" role="listbox">
                <!--First slide-->
                <div class="carousel-item active">
                <img class="d-block w-100" src="img/banner/Laptop Bags.png"
                    alt="Laptop Bags - Amit Traders">
                </div>
                <!--/First slide-->
                <!--Second slide-->
                <div class="carousel-item">
                <img class="d-block w-100" src="img/banner/Passport Holder.png"
                    alt="Gents Wallet - Amit Traders">
                </div>
                <!--/Second slide-->
                <!--Third slide-->
                <div class="carousel-item">
                <img class="d-block w-100" src="img/banner/Gents Wallet.png"
                    alt="Gents Wallet - Amit Traders">
                </div>
                <!--/Third slide-->
            </div>
            <!--/.Slides-->
            <!--Controls-->
            <a class="carousel-control-prev" href="#carousel-example-1z" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carousel-example-1z" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
            <!--/.Controls-->
            </div>
        <!--/.Carousel Wrapper-->

        <!-- About us -->
            <div class="py-5 px-4 container-fluid" style="background-color: #ffba8d75">
                <h1 class="text-center p-4" style="font-family:'Righteous', 'sans-serif'">ABOUT US</h1>
                <div class="row py-3">
                    <div class="about-img col-md-4 px-3">
                        <img src="img/amittradersindia.jpg" style="width:100%"/>
                    </div>
                    <div class="about-content text-justify col-md-8 px-3" style="font-family:'Poppins','sans-serif';font-size:18px;line-height:1.6em">
                        <p>
                            We at Amit Traders deal in manufacturing and supplying genuine leather products
                            and corporate gift articles such as Laptop Bags, Passport Holders, Gents Wallet, etc.
                            We have established our mark in the leather goods industry along with our corporate clients.
                            Our aim is to provide you the best quality of leather product with fine finishing and 
                            at best suitable rates for the products.
                        </p>
                        <p>
                            Check out our range of products below.
                        </p>
                        <a class="btn btn-elegant btn-lg waves-effect" href="./products.php">Browse Products</a>
                    </div>
                </div>
            </div>
        <!-- About us -->

        <!-- Featured Products -->
        <div class="py-5 px-4 container-fluid">
            <h1 class="text-center p-4" style="font-family:'Righteous', 'sans-serif'">OUR PRODUCTS</h1>
        </div>
        <!-- Featured Products -->

    <!-- End your project here-->

<?php include ('includes/footer.php');?>