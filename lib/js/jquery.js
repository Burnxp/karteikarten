$(function(){
    $('footer').html(`&copy;2025 Karteikarten <a href="impressum.html">Impressum</a> <a href="datenschutz.html">Datenschutz</a><br>
      Letzte Aktuallisierung: 02.02.2025 <br>`)

      $('.info').hide();
      $('.inhalt').on('click', function(){
          $(this).next().slideToggle();
      })

      //info Box aufruf
      $('.inhalt1').on('click', function(){
        const modal = document.createElement("div");
        modal.id = "myModalSave";
        modal.className = "modalSave";

        modal.innerHTML = `
            <div id="modalContent" class="modal-info-content">
                <p>Gib das Thema ein, für das du Karteikarten erstellen möchtest. z.B. Englisch.</p>
                <button id="confirmDanke" class="modal-button">Danke</button>
                
            </div>
        `;
        const body = document.getElementsByTagName('body')[0];
        body.appendChild(modal);
        $('#confirmDanke').on('click', function(){
            modal.remove();
        })
      })
      $('.inhalt2').on('click', function(){
        const modal = document.createElement("div");
        modal.id = "myModalVerzeichnis";
        modal.className = "modalVerzeichnis";

        modal.innerHTML = `
            <div id="modalContent" class="modal-info-content">
                <p>Hier kannst du mit einen Klick auf den jeweiligen Bereich deine Karten anzeigen lassen und sehen in welchem Fach sie sich momentan befinden.</p>
                <button id="confirmDanke" class="modal-button">Danke</button>
                
            </div>
        `;
        const body = document.getElementsByTagName('body')[0];
        body.appendChild(modal);
        $('#confirmDanke').on('click', function(){
            modal.remove();
        })
      })
      .css('cursor', 'pointer')

/*       let level = $('.level');
      if (level){
        
      } */
      
      

      // Navi: Seite die gerade aufgerufen ist hat eine ander Hintergrundfarbe
      $('a[href="#"]').parent().css('backgroundColor','#ecf2f585')
})