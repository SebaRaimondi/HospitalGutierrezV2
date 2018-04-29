<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/main.css">
    <link rel="shortcut icon" href="imgs/favicon.ico" />
    <link rel="stylesheet" href="font-awesome/css/font-awesome.min.css">
    <title>Hospital Gutierrez - Seccion de usuario</title>
</head>

<body>
    <nav>
        <ul class="topnav">
            <li class="logo-li"><a href="index.html" class="logoA"><img src="imgs/logo2.png" alt="Logo del Hospital Gutierrez" class="logo" height="46" width="46"></a></li>
            <li><a class="active" href="index.html"><small><strong>Hospital Dr. Ricardo Gutiérrez</strong></small></a></li>
            <li><a href="index.html"><small><i class="fa fa-home" aria-hidden="true"></i> INICIO </small></a></li>
            <li><a href="#"><small><i class="fa fa-users" aria-hidden="true"></i> PACIENTES </small></a></li>
            <li class="right"><a href="#usuario"><small><i class="fa fa-user-md" aria-hidden="true"></i> LUCIO RINGUELET </small></a></li>
            <li class="right search">
                <form class="navbar-form navbar-left">
                    <div class="search-btn-div">
                        <div class="search-div">
                            <input type="text" class="search input-google" placeholder="Ingrese texto aqui" required title="Buscar">
                            <span class="highlight"></span>
                            <span class="bar"></span>
                        </div>
                        <div class="btn-div">
                            <button type="submit" class="btn btn-default buttonSearch">Buscar</button>
                        </div>
                    </div>
                </form>
            </li>
            <li class="right dropdown">
                <a href="javascript:void(0)" class="dropbtn"><small> AMINISTRACIÓN </small> &#9660;&nbsp;</a>
                <div class="dropdown-content">
                    <a class="dropdown-link" href="#usuarios"><small> USUARIOS </small></a>
                    <a class="dropdown-link" href="#roles"><small> ROLES </small></a>
                    <a class="dropdown-link" href="#permisos"><small> PERMISOS </small></a>
                    <hr>
                    <a class="dropdown-link" href="#configuracion"><small> CONFIGURACIÓN </small></a>
                </div>
            </li>
        </ul>
    </nav>

    <footer class="footer-div">
        <div>
            <p> ©<a href="https://www.proyecto2017.linti.unlp.edu.ar/"> Proyecto de Software 2017</a>-
                Aplicación web para el hospital Dr. Ricardo Gutiérrez.</p>
        </div>
    </footer>
</body>

</html>