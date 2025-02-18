import {
    bootstrapCameraKit, 
    createMediaStreamSource, 
    Transform2D, 
} from '@snap/camera-kit'

(async function(){
    //Accessing the API
    var cameraKit = await bootstrapCameraKit({ apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzM5ODUxMTA2LCJzdWIiOiI4OGM0OWM1ZS03YTM2LTQ1MDctOWJmYi0xYWVlMDM4NjE4Y2F-U1RBR0lOR34yMjVlZDlhOS0wZDYxLTQ3ZTEtOGUzOC03ZGI1MGRlZWM5YjkifQ.45idH0ZT25qkbR3Kf2wsgUTe9fFxz-rTobnZEYZ3Tjw'})

    //Accessing and replacing the canvas created by the live footage taken by the camera
    const session = await cameraKit.createSession() 
    document.getElementById('canvas').replaceWith(session.output.live) 

    //Accessing the lens group created in Camera Kit
    const {lenses }= await cameraKit.lensRepository. loadLensGroups (['4be1ce37-8195-4d81-bc43-f3ae6e87359e']) 

    //Accessing the only lens available: AR AURA
    session.applyLens(lenses[0])
    
    //Accessing the back camera
    let mediaStream = await navigator.mediaDevices.getUserMedia({ video: 
        {facingMode: 'environment'} 
    });

    const source = createMediaStreamSource(mediaStream, {
        cameraType: 'back'
    })

    
    // //Accessing the Front camera
    // let mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, });

    // const source = createMediaStreamSource(
    // mediaStream, {
    //     transform:  Transform2D.MirrorX,
    //     cameraType: 'front'
    // })

    //Finding source, i.e., the webpack server to host to a hppts// localhost
    await session.setSource(source)

    //Rendering the model to the source
    session.source.setRenderSize(window.innerWidth, window.innerHeight)

    session.play()
})(); 