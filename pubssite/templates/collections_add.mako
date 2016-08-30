<!--
2 Modals
1. Adding a collection Name
2. Message Modal
-->
<%def name="collection_templates()">
<script type="text/template" id="optionTemplate">
    <option value={{collection_id}}>{{collection_name}}</option>
</script>

<script type="text/template" id="messageTemplate">
    <p>{{message}}</p>
</script>

<script type="text/template" id="newCollectionNameTemplate">
    <div class="form-group">
      <label for="newName">Enter name for the new collection:</label>
        <input type="text" class="form-control" id="newName">
  </div>
</script>
</%def>

<%def name="add_to_collection_control()">
    <form> 
      <div class="form-group">
        <label for="sel1">Add selected citations to:</label>
        <select class="form-control" id="listCollections">
          
        </select>
      </div>
        <button type="button" class="btn btn-default" id="addToCollection" data-target="#newCollectionModal" data-toggle="modal">Add</button> 
    </form>
</%def>

<%def name="collection_modals()">
<div class="modal fade" id="collectionConfirmModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="newCollectionModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="saveNewCollection">Save changes</button>
      </div>
    </div>
  </div>
</div>
</%def>
