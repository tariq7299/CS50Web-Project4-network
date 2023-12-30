import {useState} from 'react';
import './App.scss';

function App() {
  const [isActive, setIsActive] = useState(false)

  function handelPostModal() {
    setIsActive(!isActive)
  }

  return (
      <div className="parent-container" >

      <div className="modal-container" style={ isActive ? {display: 'block'} : {display: 'none'} }>
      </div>
      <div className="modal-window" style={ isActive ? {display: 'block'} : {display: 'none'} }>
        <button onClick={handelPostModal}>Close</button>
        <img src="default-profile.svg.png"></img>
        <h2>What's happening?</h2>
        <button>Post</button>
      </div>

      <div className="navbar">
        <div className="side-navbar">
         <a href="#">Network Project</a>
         <a href="#">Home</a>
         <a href="#">Logout</a>
         <button className="new-post-button" onClick={handelPostModal}>Post</button>
         <div className="user-info">
          <img className="profile-image" src="default-profile.svg.png" alt="user-profile-image"></img>
          <p className="user-actual-name">Tariq Sarhan</p>
          <p className="username">teka</p>
          </div>
        </div>
        <div className= "top-navbar">
          <a href="#"> for you</a>
          <a href="#"> Following</a>
        </div>
      </div>

      <div className="main-content"> 
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Etiam tempor orci eu lobortis elementum nibh. Ultricies leo integer malesuada nunc vel. Varius vel pharetra vel turpis nunc eget lorem dolor. Et netus et malesuada fames ac. Elementum curabitur vitae nunc sed velit dignissim sodales ut. In nibh mauris cursus mattis. Pellentesque pulvinar pellentesque habitant morbi tristique. Aliquam vestibulum morbi blandit cursus risus at ultrices. Iaculis urna id volutpat lacus laoreet non curabitur. Egestas purus viverra accumsan in. Massa ultricies mi quis hendrerit dolor. Aliquam nulla facilisi cras fermentum odio.

        Eget felis eget nunc lobortis mattis. Amet cursus sit amet dictum sit. Cras sed felis eget velit aliquet. Sit amet cursus sit amet. Ac felis donec et odio pellentesque diam volutpat commodo. Etiam dignissim diam quis enim. Dui vivamus arcu felis bibendum ut tristique. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Cursus euismod quis viverra nibh cras pulvinar. Eget aliquet nibh praesent tristique magna sit amet. Auctor elit sed vulputate mi sit amet. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget. Lacus laoreet non curabitur gravida arcu ac tortor. Nullam eget felis eget nunc lobortis mattis.

        Mi ipsum faucibus vitae aliquet nec ullamcorper sit. Ultrices tincidunt arcu non sodales neque sodales ut etiam sit. Rutrum tellus pellentesque eu tincidunt tortor. Et odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Sit amet dictum sit amet. Rhoncus dolor purus non enim praesent elementum facilisis. Elementum facilisis leo vel fringilla est ullamcorper. Et tortor consequat id porta nibh venenatis. Viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem.

        Morbi tincidunt ornare massa eget egestas purus. Aliquet sagittis id consectetur purus ut. Nunc aliquet bibendum enim facilisis gravida. Viverra mauris in aliquam sem fringilla ut morbi. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. Purus in mollis nunc sed id. Diam sit amet nisl suscipit adipiscing bibendum est ultricies. A lacus vestibulum sed arcu non odio euismod lacinia at. Hac habitasse platea dictumst vestibulum. Vel fringilla est ullamcorper eget. Sed risus pretium quam vulputate dignissim suspendisse. Blandit libero volutpat sed cras. Feugiat nisl pretium fusce id velit ut. Senectus et netus et malesuada fames ac turpis. Sed faucibus turpis in eu mi bibendum neque.

        Ultrices gravida dictum fusce ut placerat orci nulla. Id eu nisl nunc mi. In aliquam sem fringilla ut morbi. Consectetur purus ut faucibus pulvinar elementum. Sodales ut eu sem integer vitae justo eget magna. Proin fermentum leo vel orci. Ipsum dolor sit amet consectetur adipiscing elit duis tristique. Egestas maecenas pharetra convallis posuere morbi leo. Varius vel pharetra vel turpis. Nulla facilisi cras fermentum odio. Senectus et netus et malesuada fames ac turpis egestas maecenas. Nulla facilisi cras fermentum odio eu feugiat pretium nibh. Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet. Dapibus ultrices in iaculis nunc sed augue lacus.

        Nibh sit amet commodo nulla facilisi nullam vehicula ipsum a. Rhoncus urna neque viverra justo nec ultrices. Gravida quis blandit turpis cursus in hac habitasse. Morbi leo urna molestie at elementum eu facilisis sed. Eget nulla facilisi etiam dignissim diam quis enim lobortis. Non enim praesent elementum facilisis leo vel fringilla est. Nam at lectus urna duis. Nisl nisi scelerisque eu ultrices. Augue neque gravida in fermentum et sollicitudin ac orci phasellus. Egestas erat imperdiet sed euismod nisi porta lorem. Tristique risus nec feugiat in fermentum. Consequat ac felis donec et. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Nulla malesuada pellentesque elit eget gravida. Amet est placerat in egestas erat imperdiet sed euismod.

        Arcu cursus vitae congue mauris rhoncus aenean. A scelerisque purus semper eget duis at. Sit amet consectetur adipiscing elit pellentesque habitant. Nunc pulvinar sapien et ligula ullamcorper malesuada. Lacus vel facilisis volutpat est velit. Nulla aliquet enim tortor at auctor urna nunc id cursus. Nisl nisi scelerisque eu ultrices vitae. Facilisis gravida neque convallis a cras semper. Integer eget aliquet nibh praesent tristique. Nunc sed id semper risus in hendrerit gravida. Molestie at elementum eu facilisis sed.

        Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Scelerisque viverra mauris in aliquam sem. Nisl pretium fusce id velit. Facilisis gravida neque convallis a cras semper. Sed euismod nisi porta lorem. Id aliquet lectus proin nibh nisl. Dolor purus non enim praesent. Sed id semper risus in hendrerit gravida rutrum. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Diam volutpat commodo sed egestas egestas fringilla phasellus. Neque laoreet suspendisse interdum consectetur libero. Morbi tristique senectus et netus et malesuada fames ac.

        Tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Est placerat in egestas erat imperdiet. Cras adipiscing enim eu turpis egestas. Amet mauris commodo quis imperdiet massa tincidunt nunc. Blandit libero volutpat sed cras ornare. Ac auctor augue mauris augue neque. Vehicula ipsum a arcu cursus vitae congue mauris. Aenean euismod elementum nisi quis eleifend quam adipiscing. Massa tincidunt nunc pulvinar sapien et ligula. Varius quam quisque id diam vel quam. Volutpat est velit egestas dui id ornare arcu odio ut. Lacus viverra vitae congue eu consequat. Egestas dui id ornare arcu odio ut. Scelerisque fermentum dui faucibus in ornare. Imperdiet proin fermentum leo vel orci porta.

        Sed vulputate mi sit amet mauris commodo quis. Non arcu risus quis varius quam quisque. Nisl condimentum id venenatis a. At ultrices mi tempus imperdiet nulla malesuada pellentesque. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Quam viverra orci sagittis eu volutpat odio facilisis mauris sit. Nisi porta lorem mollis aliquam ut. Dignissim convallis aenean et tortor at risus. Nullam non nisi est sit. Quis imperdiet massa tincidunt nunc pulvinar. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. Convallis convallis tellus id interdum velit laoreet. Nunc lobortis mattis aliquam faucibus. Tortor at risus viverra adipiscing.

        Quam lacus suspendisse faucibus interdum posuere lorem. Ultrices dui sapien eget mi. Tellus mauris a diam maecenas sed enim ut. Porttitor lacus luctus accumsan tortor posuere ac ut consequat. Faucibus pulvinar elementum integer enim neque. Nisi lacus sed viverra tellus in hac habitasse platea dictumst. Pharetra et ultrices neque ornare. Pulvinar proin gravida hendrerit lectus a. Scelerisque purus semper eget duis. Nam aliquam sem et tortor consequat id porta nibh venenatis. Risus commodo viverra maecenas accumsan lacus. Porttitor leo a diam sollicitudin tempor.

        Quam pellentesque nec nam aliquam sem et. Ut consequat semper viverra nam libero justo laoreet. Sed enim ut sem viverra aliquet eget sit. Dui faucibus in ornare quam viverra orci sagittis. Sit amet volutpat consequat mauris nunc. Egestas erat imperdiet sed euismod nisi porta lorem. Vel turpis nunc eget lorem. Eu mi bibendum neque egestas congue quisque egestas. Cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Dignissim convallis aenean et tortor at. Ornare lectus sit amet est placerat in egestas. Velit euismod in pellentesque massa placerat duis. Eget nunc lobortis mattis aliquam faucibus purus in. Auctor elit sed vulputate mi sit amet. Erat nam at lectus urna duis convallis convallis tellus.

        Id venenatis a condimentum vitae. Convallis tellus id interdum velit. Augue ut lectus arcu bibendum at. Mauris a diam maecenas sed enim ut sem viverra. Habitant morbi tristique senectus et netus et malesuada. Et pharetra pharetra massa massa ultricies mi. Dolor morbi non arcu risus quis. Ut consequat semper viverra nam. Quisque non tellus orci ac auctor augue mauris. Dictum fusce ut placerat orci nulla pellentesque.

        Ullamcorper a lacus vestibulum sed. Amet dictum sit amet justo donec enim diam. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Suscipit adipiscing bibendum est ultricies integer. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Bibendum arcu vitae elementum curabitur vitae nunc. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Convallis convallis tellus id interdum. Phasellus vestibulum lorem sed risus. Eget nunc lobortis mattis aliquam. Maecenas ultricies mi eget mauris pharetra et ultrices neque. Potenti nullam ac tortor vitae. Quam pellentesque nec nam aliquam sem et tortor consequat id. Urna condimentum mattis pellentesque id nibh tortor. Odio facilisis mauris sit amet massa. Amet nulla facilisi morbi tempus. Pellentesque sit amet porttitor eget dolor morbi. Vulputate eu scelerisque felis imperdiet. Volutpat est velit egestas dui.

        Pellentesque habitant morbi tristique senectus et netus. Justo donec enim diam vulputate ut pharetra sit amet. Ac orci phasellus egestas tellus rutrum tellus pellentesque. Euismod lacinia at quis risus sed vulputate odio ut. Arcu ac tortor dignissim convallis aenean et tortor at risus. Ultricies lacus sed turpis tincidunt id aliquet. Arcu odio ut sem nulla. Ultrices mi tempus imperdiet nulla malesuada pellentesque. Purus sit amet luctus venenatis lectus. Ac odio tempor orci dapibus ultrices in iaculis. Lacus vestibulum sed arcu non odio. Congue quisque egestas diam in arcu cursus euismod quis viverra. Risus sed vulputate odio ut. Morbi leo urna molestie at elementum. Nibh cras pulvinar mattis nunc. Mauris sit amet massa vitae tortor. Eu sem integer vitae justo eget magna fermentum. Eu scelerisque felis imperdiet proin fermentum leo. Mollis nunc sed id semper risus in hendrerit gravida. In tellus integer feugiat scelerisque varius morbi enim nunc.
        </p>
      </div>
    </div>
  );
}

export default App;
