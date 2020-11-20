<?php

namespace App\Http\Controllers;

use Elibyy\TCPDF\Facades\TCPDF;
use Illuminate\Http\Request;
use PDF;



class CertificadosController extends Controller
{
    //

    public function index()
    {
        $nombre_beneficiario = '';
        $identificacion = '';
        $promedio_ovas = '';
        $precio = '';
        $fecha_texto = '';

        //get default settings from config/laravel-tcpdf.php
        $html =
            <<<EOD
<html>
<head>
    <style>
        .text_blank_footer{
            font-weight: bold;
            padding: 20px;
            color: #ffffff;
        }
        .footer{
            background-color: #ff6600;
        }
        .cabecera{
            color: black;
            font-weight: bold;
            font-size: 10px;

        }
        #footer{
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 2.5rem; 
        }
        .text_footer{
            color: rgb(14, 105, 179);
            font-size: 8px;
        }
       
    </style>
</head>

<body>
<div class="image-fondo cabecera">
    <table width="100%" border="0">
        <tr>
            <td>
                <table width="100%" border="0">
                    <tr>
                        <td width="80%" align="center">
                            <h2>TRUCHAS SURALA S.A.S</h2>
                            <h2>NIT. 800.190.239 – 9</h2>
                        </td>
                        <td width="20%" align="right">
                            <img src="img/logosuralaNorma.png" width="300px">
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <br><br><br>
                <h1>CERTIFICA</h1>
                <br><br>
            </td>
        </tr>
        <tr>
            <td>
                <p align="center">Somos proveedores de OVAS EMBRIONADAS DE TRUCHA ARCOIRIS, del señor
                    $nombre_beneficiario , identificado con $identificacion
                    desde hace más de 2 años.<br>
                    Se suministra un promedio de $promedio_ovas ovas mensuales, equivalentes a $precio<br>
                    Somos distribuidores autorizados para Colombia, de la compañía TROUTLODGE INC. de Estados
                    Unidos.<br>
                    PERMISO DE COMERCIALIZACIÓN RES No. 0934 AUNAP / 22 de Mayo de 2020<br><br><br>
                    Esta certificación se expide a los $fecha_texto.
                </p>
               
            </td>
        </tr>
       
        <tr>
        <td>
        </td>
        </tr>
        <tr>
        <td>
        <br>
        </td>
        </tr>
        <tr>
            <td>
            <p style="font-weight: bold;">
            <br><br><br>
            <br><br><br>

            Cordialmente,<br><br>
            Adriana del Pilar Sastre Hernandez.<br>
            c.c. 53.161.633<br>
            GERENTE DE VENTAS<br>
            TRUCHAS SURALA S.A.S<br>
            <br>
        </p>
            </td>
        </tr>
        
       
      
    </table>
    <br>
    <br>
 

    <footer id="footer">
    <table>
    <tr>
            <td>
                <hr>
            </td>
        </tr>
    <tr width="100%">
    <td width="100%">
        <table width="100%" border="0">
            <tr>
                <td width="25%">
                    <table  width="100%">
                        <tr>
                        <td align="right" width="30%" >
                                <img src="img/llamada-de-telefono-inteligente.png" height="40px">
                            </td>
                            <td align="left"  width="70%">
                                <label class="text_footer">
                                    Celular:<br>
                                    320 854 1588
                                </label>
                            </td>
                        </tr>
                    </table>
                </td>
                <td width="25%">
                    <table  width="100%">
                        <tr>
                        <td align="right" width="30%" >
                                <img src="img/email.png" height="40px">
                            </td>
                            <td align="left"  width="70%">
                                <label class="text_footer">
                                    Correo Electrónico :<br>
                                    comercial@truchasurala.com
                                </label>
                            </td>
                        </tr>
                    </table>
                </td>        
                <td width="25%">
                    <table  width="100%">
                        <tr>
                        <td align="right" width="30%" style=" align-items: center; justify-content: center;" >
                                <img src="img/fax.png" height="40px">
                            </td>
                            <td align="left"  width="70%">
                                <label class="text_footer"> 
                                    Fax:<br>
                                    1- 856 2126
                                </label>
                            </td>
                        </tr>
                    </table>
                </td>                
                <td width="25%">
                    <table  width="100%">
                        <tr>
                            <td align="right" width="30%" >
                                <img src="img/marcador-de-posicion.png" height="40px" >
                            </td>
                            <td align="left"  width="70%">
                                <label class="text_footer">
                                    Carrera 8. No 1 - 22<br>
                                    Chocontá - Cundinamarca
                                </label>
                            </td>
                        </tr>
                    </table>
                </td>                    
            </tr>
        </table>
    </td>
</tr>
    <tr>
            <td class="footer" align="center">
                <label class="text_blank_footer">
                    <img src="img/global.png" width="20px">
                    www.truchasurala.com
                </label>
            </td>
        </tr>
        </table>
    </footer>
    </div>
</body>

</html>
EOD;

        // PDF::SetTitle('Hola Mundo');
        // PDF::AddPage();
        // PDF::Write(0, 'Bienvenido a TCPDF-Laravel');
        // PDF::Output('hola_mundo.pdf');
        // set document information
        PDF::SetCreator('Surala');
        PDF::SetAuthor('Surala');
        PDF::SetTitle('Certificación');
        PDF::SetKeywords('SURALA, PDF, CERTIFICADO, COMERCIAL');
        // set default header data
        PDF::SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE . ' 025', PDF_HEADER_STRING);

        // set header and footer fonts
        PDF::SetHeaderFont(array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
        PDF::SetFooterFont(array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

        // remove default header/footer
        #PDF::setPrintHeader(false);
        #PDF::setPrintFooter(false);

        // set default monospaced font
        PDF::SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
    
       

        // set margins
        PDF::SetMargins(5, 18, 5);
        PDF::SetHeaderMargin(8);
        PDF::SetFooterMargin(PDF_MARGIN_FOOTER);

        // set auto page breaks
        PDF::SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

        // set image scale factor
        PDF::setImageScale(PDF_IMAGE_SCALE_RATIO);

        // set some language-dependent strings (optional)
        if (@file_exists(dirname(__FILE__) . '/lang/eng.php')) {
            require_once(dirname(__FILE__) . '/lang/eng.php');
            PDF::setLanguageArray($l);
        }

        // ---------------------------------------------------------
        // add a page
        PDF::AddPage();
        PDF::SetFont('helvetica', '', 8);
        PDF::setCellHeightRatio(1.98);
        // -----------------------------------------------------------------------------

        PDF::Image('img/Logo_Surala2.png', 0, 50, 200, 170, '', 'http://www.truchasurala.com', '', true, 300);
       
        
        PDF::writeHTML($html, true, false, false, false, '');

        // PDF::Image('img/logosurala.png', 50, 50, 100, 100, '', 'http://www.tcpdf.org', '', true, 72);

        // $mask = PDF::Image('img/logosurala.png', 50, 140, 100, '', '', '', '', false, 300, '', true);

        // embed image, masked with previously embedded mask
        // PDF::Image('img/logosurala.png', 50, 140, 100, '', '', 'http://www.tcpdf.org', '', false, 300, '', false, $mask);



        // -----------------------------------------------------------------------------

        //Close and output PDF document
        PDF::Output('ceriticacion_surala.pdf', 'I');
    }
}
