<?
      //////////////////////
      // goglgourd@gmail.com msn or email
      // www.myLBFH.co.uk
      // Source best viewed with Crimson Editor: www.crimsoneditor.com
      // myLBFH.co.uk's YouTube "Ripper" (.flv grabber)
      //////////////////////
      // Instructions:
      // 1) Plug and play, baby! No installation/config, feel free to edit
       
      // I've done my best to annotate this and keep it neat
      // Coded in a rush it's untidy and confusing, even for me.
      // Let's begin:

      // Check if the form's been submitted
      if($_GET['youtube']) {
       
      // It has so run function "youtube_t" and redirect to that.
      $download = youtube_t($_GET['youtube']);
      header("Location: $download");
      } else {
      // It hasn't so show them the form.
      echo '
      <div align="center"><form method="get" action="' . $_SERVER['PHP_SELF'] . '"><input style="width:250px;border:1px solid #c1c0b5; color:#555555; font-size: 8pt; font-family:"Lucida Sans Unicode",Tahoma,Arial,sans-serif;background: #fafaf0;" type="text" name="youtube" /></div><div align="center"><input style="border:1px solid #c1c0b5; color:#555555; font-size: 8pt; font-family:"Lucida Sans Unicode",Tahoma,Arial,sans-serif;background: #fafaf0;" type="submit" value="Get YouTube Video" /></div>
      <div align="left"><small>Found at <a href="http://www.sizlopedia.com/">Sizlopedia</a></small></div>
      ';
      }// Functions
      // YouTube_T, this will grab the page (with g_page) and find the matches in the result
      function youtube_t ($url) {
      $page = g_page($url);
      if ($page === false)
      {
      die("Youtube down?");
      }
      preg_match('/watch_fullscreen\?video_id=(.*?)&l=(.*?)+&t=(.*?)&/', $page, $match);
      $match1 = "http://www.youtube.com/get_video?video_id=";
      if(!$match[1]){
      die("Error no matches - wrong youtube page?");
      }
      $match1 .= $match[1];
      $match1 .= "&t=";
      $match1 .= $match[3];
      return $match1;
      }
       
      // G_Page, this grabs the page for YouTube_T
      function g_page ($url)
      {
      $curl = curl_init($url);
      curl_setopt($curl, CURLOPT_HEADER, false);
      curl_setopt($curl, CURLOPT_VERBOSE, false);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
      $output = curl_exec($curl);
      // check for errors
      if (curl_errno($curl))
      {
      trigger_error('CURL error: "' . curl_error($curl) . '"', E_USER_WARNING);
      $output = false;
      }
      curl_close($curl);
      return $output;
      }

      // Blah blah blah:
      //////////////////////
      //    This program is free software; you can redistribute it and/or modify
      //    it under the terms of the GNU General Public License as published by
      //    the Free Software Foundation; either version 2 of the License, or
      //    (at your option) any later version.
      //
      //    This program is distributed in the hope that it will be useful,
      //    but WITHOUT ANY WARRANTY; without even the implied warranty of
      //    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      //    GNU General Public License for more details.
      //
      //    You should have received a copy of the GNU General Public License
      //    along with this program; if not, write to the Free Software
      //    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
      //////////////////////
      ?>
