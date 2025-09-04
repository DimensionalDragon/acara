import { classname } from "@/utils/classname";
import Image from "next/image";
import { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";

interface PropTypes {
    name: string;
    className?: string;
    isDroppable?: boolean;
}

const FileInput = (props: PropTypes) => {
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const dropzoneRef = useRef<HTMLLabelElement>(null);
    const dropzoneId = useId();

    useEffect(() => {
        const currentDropzone = dropzoneRef.current;
        if(currentDropzone) {
            currentDropzone.addEventListener('dragover', handleDragOver);
            currentDropzone.addEventListener('drop', handleDrop);
        }

        return () => {
            currentDropzone?.removeEventListener('dragover', handleDragOver);
            currentDropzone?.removeEventListener('drop', handleDrop);
        };
    }, []);

    const { name, className, isDroppable = false } = props;

    const handleDragOver = (e: DragEvent) => {
        if(isDroppable) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setUploadedImage(e.dataTransfer?.files?.[0] || null);
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if(files && files.length > 0) {
            setUploadedImage(files[0]);
        }
    }

    return (
        <label
            ref={dropzoneRef}
            htmlFor={`dropzone-file-${dropzoneId}`}
            className={classname(
                'flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100',
                className
            )}
        >
            {uploadedImage ? (
                <div className='flex flex-col justify-center items-center p-5'>
                    <div className='mb-2 w-1/2'>
                        <Image
                            fill
                            src={URL.createObjectURL(uploadedImage)}
                            alt='uploaded image'
                            className='!relative'
                        />
                    </div>
                    <p className='text-center text-sm font-semibold text-gray-500'>
                        {uploadedImage.name}
                    </p>
                </div>
            ) : (
                <div className='flex flex-col justify-center items-center p-5'>
                    <CiSaveUp2 className='mb-2 h-10 w-10 text-gray-400' />
                    <p className='text-center text-sm font-semibold text-gray-500'>
                        {isDroppable ? 'Drag and drop or click to upload file here' : 'Click to upload file here'}
                    </p>
                </div>
            )}
            <input className='hidden' accept='image/*' type='file' name={name} id={`dropzone-file-${dropzoneId}`} onChange={handleFileChange} />
        </label>
    );
}

export default FileInput;