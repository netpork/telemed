<div id="measures" class="tm-panel text-shadow">
	
	<header class="topcoat-navigation-bar row">
		<div class="topcoat-navigation-bar__item column-1-hand">
            <button id="backButton" data-route="#/" class="topcoat-icon-button--large--quiet" style="width: 100px;">
                <span class="icomatic">back</span>
                Nazaj
            </button>
        </div>
		<div class="topcoat-navigation-bar__item column-auto-hand center">
			<h1 class="topcoat-navigation-bar__title">Meritve</h1>
		</div> 
	</header>


	<section class="row" style="height: 91%; background-color: whiteSmoke;">
		<div class="column-3-hand left-container text-shadow">
			
			<section id="sidebar-menu" class="left-content"></section>
	
		</div>

<!-- measures -->
		<div id="measuresContainer" class="column-auto-hand right-container" style="display: block;">
			<div id="graph" class="text-shadow"></div>
			
<!-- pressure insert page #1 -->
		<div id="pressureInsertPage1" class="row middle-hand page pressure-page" style="display: none;">
			<div class="column-auto-hand center">
				<p>Danes še niste vnesli meritve.</p>
				<p>Ali želite to narediti sedaj?</p>

				<div class="row around-hand" style="margin-top: 40px;">
					<div class="column-2-hand">
						<button data-button="no" class="pressure-button topcoat-button--large">Ne</button>
					</div>
					<div class="column-2-hand">
						<button data-button="yes" class="pressure-button topcoat-button--large--cta">Da</button>
					</div>
				</div>

			</div>
		</div>

<!-- pressure insert page #2 -->
		<div id="pressureInsertPage2" class="page-margin pressure-page" style="display: none;">
			<div class="row around-hand">
				<div class="column-3-hand">
					<img src="assets/img/merjenje_tlaka.jpg" width="309" height="210" alt="blood pressure measurment">
					<p class="input-label">Sistolični (gornji) krvni tlak:</p>
					<input type="tel" maxlength="3" pattern="[0-9]+" class="topcoat-text-input" id="systolic">
				</div>
				<div class="column-5-hand pressure-text">
					<p>
					Manšeto namestite na ustrzno mesto (na nadlakti ali podlakti), tako da bo povezovalna cevka izhajala iz manšete na notranji strani komolca (merilniki z manšeto na nadlakti). Meritev vedno izvajajte na isti roki.
					</p>
					<p>
					Med meritvijo krvnega tlaka mora biti manšeta v višini srca, ne glede na način, kako merite krvni tlak (na nadlakti ali podlakti, sede, leže ali stoje). Roka nak počiva podprta v udobnem položaju.
					</p>
				</div>
			</div>

			<div class="row" style="margin-top: 20px">
				<div class="offset-10-hand column-2-hand">
					<button data-button="next" class="pressure-button topcoat-button--large--cta">Naprej</button>
				</div>
			</div>

		</div>

<!-- pressure insert page #3 -->
		<div id="pressureInsertPage3" class="page-margin pressure-page" style="display: none;">
			<div class="row around-hand">
				<div class="column-3-hand">
					<img src="assets/img/merjenje_tlaka.jpg" width="309" height="210" alt="blood pressure measurment">
					<p class="input-label">Diastolični (spodnji) krvni tlak:</p>
					<input type="tel" maxlength="3" pattern="[0-9]+" class="topcoat-text-input" id="diastolic">

				</div>
				<div class="column-5-hand pressure-text">
					<p>
					Manšeto namestite na ustrzno mesto (na nadlakti ali podlakti), tako da bo povezovalna cevka izhajala iz manšete na notranji strani komolca (merilniki z manšeto na nadlakti). Meritev vedno izvajajte na isti roki.
					</p>
					<p>
					Med meritvijo krvnega tlaka mora biti manšeta v višini srca, ne glede na način, kako merite krvni tlak (na nadlakti ali podlakti, sede, leže ali stoje). Roka nak počiva podprta v udobnem položaju.
					</p>
				</div>
			</div>

			<div class="row" style="margin-top: 20px">
				<div class="column-2-hand">
					<button data-button="back" class="pressure-button topcoat-button--large--cta">Nazaj</button>
				</div>
				<div class="offset-8-hand column-2-hand">
					<button data-button="save" class="pressure-button topcoat-button--large--cta">Zaključi</button>
				</div>
			</div>

		</div>

<!-- button for status insert -->
			<div id="insertButton" class="row end-hand" style="margin-top: 20px; visibility: hidden; opacity: 0;">
				<div class="column-2-hand">
					<button class="topcoat-button--cta">Vnos</button>
				</div>
			</div>
		</div>

	</section>


</div>