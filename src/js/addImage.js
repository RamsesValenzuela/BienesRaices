import {Dropzone} from 'dropzone'
import { header } from 'express-validator'

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

Dropzone.options.image = {
    dictDefaultMessage: 'Sube tus Imágenes Aquí',
    acceptedFiles: '.png,.jpg,.jpe',
    maxFilesize: 5,
    maxFiles: 5,
    parallelUploads: 5,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Borrar Archivo',
    dictMaxFilesExceeded: 'El limite son 5 archivos',
    headers:{
        'CSRF-Token': token
    },
    paramName: 'image',
    init: function(){
        const dropzone = this

        const btnPublish = document.querySelector('#publish')

        btnPublish.addEventListener('click', function(){
            dropzone.processQueue()
        })

        dropzone.on('queuecomplete', function(){
            if(dropzone.getActiveFiles().length ==0){
                window.location.href = '/mis_propiedades'
            }
        })

    }

}