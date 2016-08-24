<!--Start Journal Template-->
<script type="text/template" id="journalTemplate">
<label>Journal</label>
<input class="form-control input-sm" id="journal" name="Journal" type="text" required="true" value="{{journal}}">
</script>
<!--End Journal Template-->

<!--Start Month Template-->
<script type="text/template" id="monthTemplate">
<label>Month</label>
<select class="form-control input-sm" id="month">
  <option value="january">January</option>
  <option value="february">February</option>
  <option value="march">March</option>
  <option value="april">April</option>
  <option value="may">May</option>
  <option value="june">June</option>
  <option value="july">July</option>
  <option value="august">August</option>
  <option value="september">September</option>
  <option value="october">October</option>
  <option value="november">November</option>
  <option value="december">December</option>
</select>
</script>
<!--End Month Template-->

<!--Start Volume Template-->
<script type="text/template" id="volumeTemplate">
<label>Volume</label>
<input class="form-control input-sm" id="volume" name="Volume" type="number" required="true" value="{{volume}}">
</script>
<!--End Volume Template-->

<!--Start Number Template-->
<script type="text/template" id="numberTemplate">
<label>Number</label>
<input class="form-control input-sm" id="number" type="number" value="{{number}}">
</script>
<!--End Number Template-->

<!--Start Pages Template-->
<script type="text/template" id="pagesTemplate">
<label>Pages</label>
<input class="form-control input-sm" id="pages" name="Pages" type="text" required="true" value="{{pages}}">
</script>
<!--End Pages Template-->

<!--Start Note Template-->
<script type="text/template" id="noteTemplate">
<label>Note</label>
<textarea class="form-control" rows="4" id="note">{{note }}</textarea>
</script>
<!--End Note Template-->

<!--Start Book Title Template-->
<script type="text/template" id="bookTitleTemplate">
<label>Book Title</label>
<input class="form-control input-sm" id="booktitle" name="Book Title" type="text" required="true" value="{{booktitle}}">
</script>
<!--End Book Title Template-->

<!--Start Publisher Template-->
<script type="text/template" id="publisherTemplate">
<label>Publisher</label>
<input class="form-control input-sm" id="publisher" name="Publisher" type="text" required value="{{publisher}}">
</script>
<!--End Publishr Template-->

<!--Start chapter Template-->
<script type="text/template" id="chapterTemplate">
<label>Chapter</label>
<input class="form-control input-sm" id="chapter" type="number" value="{{chapter}}">
</script>
<!--End chapter Template-->

<!--Start city Template-->
<script type="text/template" id="cityTemplate">
<label>City</label>
<input class="form-control input-sm" id="city" name="City" type="text" required value="{{location}}">
</script>
<!--End city Template-->

<!--Start Series Template-->
<script type="text/template" id="seriesTemplate">
<label>Series</label>
<input class="form-control input-sm" id="series" type="number" value="{{series}}">
</script>
<!--End Series Template-->  

<!--Start edition template-->
<script type="text/template" id="editionTemplate">
<label>Edition</label>
<input class="form-control input-sm" id="edition" type="number" value="{{edition}}">
</script>
<!--End edition template-->

<!--Start Institution template-->
<script type="text/template" id="institutionTemplate">
<label>Institution</label>
<input class="form-control input-sm" id="institution" name="Institution" type="text" required value="{{institution}}">
</script>
<!--End Institution template-->  

<!--Start Organization template-->
<script type="text/template" id="organizationTemplate">
<label>Organization</label>
<input class="form-control input-sm" id="organization" type="number" value="{{organization}}">
</script>
<!--End Organization template-->  

<!--Start how Published template-->
<script type="text/template" id="howPublishedTemplate">
<label>How published</label>
<input class="form-control input-sm" id="howpublished" name="How Published" type="text" required value="{{howpublished}}">
</script>
<!--End how Published template-->    

<!--Start School template-->
<script type="text/template" id="schoolTemplate">
  <label>School</label>
  <input class="form-control input-sm" id="school" name="School" type="text" required="true" value="{{school}}">
</script>
<!--End school template-->

<!--Start date retrieved template-->
<script type="text/template" id="dateRetrievedTemplate">
<label>Date Retrieved</label>
<input class="form-control input-sm" id="dateretrieved" name="Date Retrieved" type="date" required>
</script>
<!--End date retrieved template-->

<!--Start Error Message modal-->
<script type="text/template" id="errorModalTemplate">

  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Correct the following errors</h4>
      </div>
      <div class="modal-body">
      {{#errorMessages}}
        <p>{{field}} : {{message}}</p>
      {{/errorMessages}}
      </div>
      <div class="modal-footer">
        <button  id="ignore-message" type="button" class="btn btn-danger" data-dismiss="modal">Ignore</button>
        <button type="button" class="btn btn-success" data-dismiss="modal">Fill details</button>
      </div>
    </div>
  </div>

</script>
<!--End Error Message modal-->

<!--Start simple error modal-->
<script type="text/template" id="simpleErrorModalTemplate">

  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Correct the following errors</h4>
      </div>
      <div class="modal-body">
        <p>{{message}}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>

</script>
<!--End simple error modal-->

<!--End inputfield Templates-->

<!--Article Template-->
<script type="text/template" id="articleTemplate">

   <div class="col-sm-8" id="journalContainer"/>
<div class="col-sm-4" id="monthContainer"/>
<div class="col-sm-4" id="volumeContainer"/>
  <div class="col-sm-4" id="numberContainer"/>
<div class="col-sm-4" id="pagesContainer"/>
  <div class="form-group col-sm-12" id="noteContainer"/>

</script>
<!--Article Template-->

<!--Book Template-->
<script type="text/template" id="bookTemplate">

<div id="bookTitleContainer" class="col-sm-6"/>
   <div id="publisherContainer" class="col-sm-6"/>      
   <div id="chapterContainer" class="col-sm-3"/>
<div id="cityContainer" class="col-sm-6"/>
<div id="volumeContainer" class="col-sm-3"/>
  <div id="seriesContainer" class="col-sm-2"/>
<div id="editionContainer" class="col-sm-2"/>
<div id="pagesContainer" class="col-sm-2"/>
<div id="monthContainer" class="col-sm-6"/>
  <div id="noteContainer" class="form-group col-sm-12"/>

</script>
<!--End Book Template-->

<!--TechReport template-->
<script type="text/template" id="techreportTemplate">

<div class="col-sm-8" id="institutionContainer"/>
  <div class="col-sm-4" id="numberContainer"/>
<div class="col-sm-6" id="cityContainer"/>
<div class="col-sm-6" id="monthContainer"/>
  <div class="form-group col-sm-12" id="noteContainer"/>

</script>
<!--End TechReport template-->

<!--Proceedings Template-->
<script type="text/template" id="proceedingsTemplate">

<div class="col-sm-8" id="publisherContainer"/>
  <div class="col-sm-4" id="cityContainer"/>
<div class="col-sm-8" id="organizationContainer"/>
<div class="col-sm-4" id="monthContainer"/>
  <div class="form-group col-sm-12" id="noteContainer"/>

</script>
<!--End Proceedings Template-->

<!--Unpublished Template-->
<script type="text/template" id="unpublishedTemplate">

<div class="col-sm-4" id="monthContainer"/>
  <div class="form-group col-sm-12" id="noteContainer"/>

</script>
<!--End Unpublished Template-->

<!--Misc Template-->
<script type="text/template" id="miscTemplate">

<div class="col-sm-8" id="howPublishedContainer"/>
<div class="col-sm-4" id="monthContainer"/>
  <div class="form-group col-sm-12" id="noteContainer"/>

</script>
<!--End Misc Template-->

<!--phd, master thesis-->
<script type="text/template" id="thesisTemplate">

<div class="col-sm-12" id="schoolContainer"/>
  <div class="col-sm-7" id="cityContainer"/>  
<div class="col-sm-5" id="monthContainer"/>
  <div class="form-group col-sm-12" id="noteContainer"/>

</script>
<!--End phd, master thesis-->

<!--WebPublished what is date received??-->
<script type="text/template" id="webpublishedTemplate">

<div class="col-sm-8" id="dateRetrievedContainer"/>
<div class="col-sm-4" id="monthContainer"/>
  <div class="form-group col-sm-12" id="noteContainer"/>

</script>
<!--End WebPublished-->

<!--incollection Template-->
<script type="text/template" id="incollectionTemplate">

<div class="col-sm-5" id="bookTitleContainer"/>
  <div class="col-sm-4" id="cityContainer"/>
<div class="col-sm-3" id="monthContainer"/>    
<div class="col-sm-5" id="organizationContainer"/>
  <div class="col-sm-5" id="publisherContainer"/>
<div class="col-sm-2" id="pagesContainer"/>
  <div class="form-group col-sm-12" id="noteContainer"/>

</script>
<!--End incollection Template-->

<!--Manual Template-->
<script type="text/template" id="manualTemplate">

<div class="col-sm-6" id="organizationContainer"/>
  <div class="col-sm-4" id="cityContainer"/>
  <div class="col-sm-2" id="editionContainer"/>
  <div class="form-group col-sm-12" id="noteContainer"/>

</script>
<!--End Manual template-->

<!--Start Edited book template-->
<script type="text/template" id="editedBookTemplate">
<div class="col-sm-6" id="publisherContainer"/>
<div class="col-sm-6" id="cityContainer"/>
<div class="col-sm-3" id="volumeContainer"/>
<div class="col-sm-3" id="seriesContainer"/>
<div class="col-sm-3" id="editionContainer"/>
<div class="col-sm-3" id="monthContainer"/>
<div class="form-group col-sm-12" id="noteContainer"/>
</script>
<!--End Edited book template-->

<!--Start InBook Template-->
<script type="text/template" id="inBookTemplate">
<div class="col-sm-6" id="bookTitleContainer"></div>
<div class="col-sm-6" id="publisherContainer"></div>
<div class="col-sm-4" id="chapterContainer"></div>
<div class="col-sm-4" id="cityContainer"></div>
<div class="col-sm-4" id="volumeContainer"></div>
<div class="col-sm-3" id="seriesContainer"></div>
<div class="col-sm-3" id="editionContainer"></div>
<div class="col-sm-3" id="pagesContainer"></div>
<div class="col-sm-3" id="monthContainer"></div>
<div class="col-sm-12" id="noteContainer"></div>
</script>
<!--End InBook Template-->

<!--Start TranslatedBook Template-->
<script type="text/template" id="translatedBookTemplate">

<div class="col-sm-7" id="publisherContainer"/>
<div class="col-sm-5" id="cityContainer"/>
<div class="col-sm-3" id="seriesContainer"/>
<div class="col-sm-3" id="editionContainer"/>
<div class="col-sm-3" id="volumeContainer"/>
<div class="col-sm-3" id="monthContainer"/>
<div class="col-sm-12" id="noteContainer"/>

</script>
<!--End TranslatedBook Template-->

<script type="text/template" id="dataTemplate">

<div class="container-fluid">
<!--Start of column 1-->
<div class="col-sm-6 col-xs-12">
  <div class="table table-borderless table-sm col-sm-12">
    <table class="table" id="contributors-table">  
      <thead>
        <tr>
        <th></th>
        <th>Contributors</th>
        <th>Last Name, First Name</th>
        </tr>
      </thead>
      <tbody>
        {{#authors}}
          <tr class="contributors">
          <td>
            <label class="checkbox-label">
              <div class="radio">
                <input type="radio" name="optradio" class="table-radio">
              </div>
            </label>
          </td>
          <td>
            <div class="form-group">
              <select class="form-control input-sm contributor-select">
                <option value="author">Author</option>
                  <option value="editor">Editor</option>
                  <option value="translator">Translator</option>
              </select>
            </div>
          </td>
          <td>
            <div class="form-group">
              <input name ="ContributorName" class="form-control input-sm name" type="text" value="{{lastname}}, {{firstname}}">
            </div>
          </td>
          </tr>
        {{/authors}}
        {{#editors}}
						<tr>
						<td>
							<label class="checkbox-label">
								<div class="radio">
									<input type="radio" name="optradio" class="table-radio">
								</div>
							</label>
						</td>
						<td>
							<div class="form-group">
								<select class="form-control input-sm" class="contributor-select">
									<option value="author">Author</option>
			    					<option value="editor" selected="selected">Editor</option>
			    					<option value="translator">Translator</option>
								</select>
							</div>
						</td>
						<td>
							<div class="form-group">
								<input class="form-control input-sm name" type="text" value="{{lastname}}, {{firstname}}">
							</div>
						</td>
						</tr>
					{{/editors}}
          {{#translators}}
						<tr>
						<td>
							<label class="checkbox-label">
								<div class="radio">
									<input type="radio" name="optradio" class="table-radio">
								</div>
							</label>
						</td>
						<td>
							<div class="form-group">
								<select class="form-control input-sm" class="contributor-select">
									<option value="author">Author</option>
			    					<option value="editor">Editor</option>
			    					<option value="translator" selected="selected">Translator</option>
								</select>
							</div>
						</td>
						<td>
							<div class="form-group">
								<input class="form-control input-sm name" type="text" value="{{lastname}}, {{firstname}}">
							</div>
						</td>
						</tr>
					{{/translators}}
      </tbody>
    </table>
  </div>
  <div id="table-buttons" class="btn-grp col-sm-12">
    <button type="button" class="btn btn-default btn-md" id="add">
      <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
    </button>
    <button type="button" class="btn btn-default btn-md" id="up">
      <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
    </button>
    <button type="button" class="btn btn-default btn-md" id="down">
      <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
    </button>
    <button type="button" class="btn btn-default btn-md" id="delete">
      <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
    </button>
  </div>

    <div class="form-group">
      <div class="col-sm-8">
        <label for="title">Title</label>
        <input class="form-control input-sm" id="title" name="Title" type="text" required="true" value="{{title}}" />
      </div>
      <div class="col-sm-4">
        <label for="year">Year</label>
        <input class="form-control input-sm" id="year" name="Year" type="number" required="true" value="{{year}}" />
      </div>
    </div>
    <div class="form-group col-sm-12">
      <label for="pubtype">Publication Type:</label>
      <select class="form-control input-sm" id="pubtype">
        <option value="article">Article</option>
        <option value="book">Book</option>
        <option value="edited_book">Edited Book</option>
        <option value="conference">Conference</option>
        <option value="inbook">In Book</option>
        <option value="incollection">In Collection</option>
        <option value="inproceedings">In Proceedings</option>
        <option value="manual">Manual</option>
        <option value="mastersthesis">Master's Thesis</option>
        <option value="phdthesis">Ph.D. Thesis</option>
        <option value="proceedings">Proceedings</option>
        <option value="techreport">Tech Report</option>
        <option value="unpublished">Unpublished</option>
        <option value="misc">Miscellaneous</option>
        <option value="translated_book">Translated Book</option>
        <option value="web_published">Web Published</option>
      </select>
    </div>
    <!--Start of dynamic elements forms-->
    
    <div class="form-group" id="dynamicTemplateContainer">
       
  </div>
  <!--End of filling the dynamic forms-->


</div><!--End of column 1-->

<div class="col-sm-6 col-xs-12">
  <div class="form-group">
    <div id="preview-pane">
      <p id="preview-header">Preview:</p>
      <label id="preview-rawtext" class="col-sm-12"></label>
    </div>
  </div>
  <button type="button" id="update-preview" class="btn btn-default btn-md">Update Preview</button>
  <button type="button" id="raw-text" class="btn btn-default btn-md">Raw Text</button>

  <div class="form-group">
    <label for="abstract">Abstract:</label>
    <textarea class="form-control" rows="4" id="abstract">{{abstract}}</textarea>
  </div>

  <div class="form-group">
    <label for="keywords">Keywords:</label>
    <textarea class="form-control" rows="4" id="keywords">{{keywords}}</textarea>
  </div>

  <div class="form-group">
    <label for="uri">URI</label>
    <input type="text" class="form-control input-sm" id="url" value={{url}}>
  </div>

  <div class="form-group">
    <label for="doi">DOI</label>
    <input class="form-control input-sm" id="doi" value="{{doi}}">  
  </div>

</div>
</div>
<div class="container-fluid">
<div id="control-buttons" class="btn-grp col-sm-12 text-center">
  <button type="button" id="verify" class="btn btn-warning">Verify</button>
  <button type="button" id="save" class="btn btn-success">Save</button>
  <!-- <input type="submit" id="save" class="btn btn-success submit" value="Save"/> -->
  <button type="button" id="close" class="btn btn-danger" data-dismiss="modal">Close</button>
</div>
<div id="errorModalContainer" class="modal fade" role="dialog"></div>
</div>

<!--On -->

</script>

<form method="post" id="wholeTemplateContainer"></form>
