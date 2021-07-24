import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div className="container-fluid mt-5 text-center">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
            <div className="content">
              <p>&nbsp;</p>
              {/*Add wedding*/}
                <div className="card mb-3 mx-auto bg-dark" style={{ maxWidth: '512px' }}>
                  <h3 className="text-white text-monospace bg-dark"><b><ins>Add Wedding</ins></b></h3>
                    <form onSubmit={async (event) => {
                      event.preventDefault()
                      let id = await this.props.addWedding(this.name1.value, this.name2.value, this.link1.value, this.link2.value)
                      document.getElementById("waddingID").innerHTML = "Your wadding id is: " + id;
                    }} >
                        <h5 className="text-white text-monospace bg-dark">Name 1:</h5>
                        <input id="name1"
                               type="text" 
                               placeholder="Enter name 1"
                               ref={(input) => { this.name1 = input }}/>
                        
                        <br/><br/>

                        <h5 className="text-white text-monospace bg-dark">Name 2:</h5>

                        <input id="name2"
                               type="text" 
                               placeholder="Enter name 2"
                               ref={(input) => { this.name2 = input }}/>

                        <br/><br/>

                        <h5 className="text-white text-monospace bg-dark">Link 1:</h5>

                        <input id="link1"
                               type="text" 
                               placeholder="Enter link 1"
                               ref={(input) => { this.link1 = input }}/>

                        <br/><br/>

                        <h5 className="text-white text-monospace bg-dark">Link 2:</h5>

                        <input id="link2"
                               type="text" 
                               placeholder="Enter link 2"
                               ref={(input) => { this.link2 = input }}/>

                        <br/><br/>

                        <h5 id="waddingID" className="text-white text-monospace bg-dark"></h5>

                      <button type="submit" className="btn-primary btn-block"><b>Add to the Blockchain!</b></button>
                    </form>
                </div>
              {/*get wedding*/}
                <div className="card mb-3 mx-auto bg-dark" style={{ maxWidth: '512px' }}>
                  <h3 className="text-white text-monospace bg-dark"><b><ins>Get Wedding</ins></b></h3>
                    <form onSubmit={ async (event) => {
                      event.preventDefault()
                      let values = await this.props.getWedding(this.wedding_id.value)
                      if(values[0].length == 0){
                        document.getElementById("return_n1").innerHTML = "No wedding found for id: " + this.wedding_id.value
                        document.getElementById("return_n2").innerHTML = ""
                        document.getElementById("return_n3").innerHTML = ""
                        document.getElementById("return_n4").innerHTML = ""
                        document.getElementById("return_n5").innerHTML = ""
                      }
                      else{
                      document.getElementById("return_n1").innerHTML = "First  name: " + values[0]
                      document.getElementById("return_n2").innerHTML = "Second name: " + values[1]
                      document.getElementById("return_n3").innerHTML = "First  link: " + values[2]
                      document.getElementById("return_n4").innerHTML = "Second link: " + values[3]
                      document.getElementById("return_n5").innerHTML = "Wedding sender address: " + values[4]
                      }
                    }} >
                        <h4 id = "return_n1" className="text-white text-monospace bg-dark"></h4>
                        <h4 id = "return_n2" className="text-white text-monospace bg-dark"></h4>
                        <h4 id = "return_n3" className="text-white text-monospace bg-dark"></h4>
                        <h4 id = "return_n4" className="text-white text-monospace bg-dark"></h4>
                        <h4 id = "return_n5" className="text-white text-monospace bg-dark"></h4>

                        <input id="wedding_id"
                               type="text" 
                               placeholder="Enter ID"
                               ref={(input) => { this.wedding_id = input }}/>
                      
                      <br></br>                        <br/><br/>

                      <button type="submit" className="btn-primary btn-block"><b>Get from the Blockchain!</b></button>
                    </form>
                </div>
              {/*divorce*/}
                <div className="card mb-3 mx-auto bg-dark" style={{ maxWidth: '512px' }}>
                  <h3 className="text-white text-monospace bg-dark"><b><ins>Divorce</ins></b></h3>
                    <form onSubmit={ async (event) => { 
                      event.preventDefault()
                      let value = await this.props.divorce(this.wedding_id_for_divorce.value)
                      if(value == true){
                        document.getElementById("divorce_id").innerHTML = "Divorced!"
                      }
                      else{
                      document.getElementById("divorce_id").innerHTML = "An error happend"
                      }
                    }} >
                        <h4 id = "divorce_id" className="text-white text-monospace bg-dark"></h4>
                        <input id="wedding_id_for_divorce"
                               type="text" 
                               placeholder="Enter ID"
                               ref={(input) => { this.wedding_id_for_divorce = input }}/>
                      
                      <br></br>                        <br/><br/>

                      <button type="submit" className="btn-primary btn-block"><b>Send to the Blockchain!</b></button>
                    </form>
                </div>
              {/*Get next wedding ID*/}
                <div className="card mb-3 mx-auto bg-dark" style={{ maxWidth: '512px' }}>
                  <h3 className="text-white text-monospace bg-dark"><b>Get next wadding ID</b></h3>
                    <form onSubmit= { async (event) => {
                      event.preventDefault()
                      const id = this.id.value
                      const nextId = await this.props.getNextId()
                      document.getElementById("id").innerHTML = nextId
                    }} >
                        
                        <h5 id="id"
                            className="text-white text-monospace bg-dark"
                            ref={(id) => { this.id = id }}>-</h5>
                        
                      <button type="submit" className="btn-primary btn-block"><b>Check from the Blockchain!</b></button>
                    </form>
                </div>
              <p>&nbsp;</p>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;