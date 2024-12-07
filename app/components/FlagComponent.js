import Image from 'next/image';

export default function FlagComponent() {
    return (
        <div className="flex flex-wrap justify-center gap-10 mt-20">
            <div className="m-2">
                <Image 
                    src="/images/flags/tr.png" 
                    alt="Image 1" 
                    width={100} 
                    height={100} 
                    className="object-contain"
                />
            </div>
            <div className="m-2">
                <Image 
                    src="/images/flags/de.png" 
                    alt="Image 2" 
                    width={100} 
                    height={100} 
                    className="object-contain"
                />
            </div>
            <div className="m-2">
                <Image 
                    src="/images/flags/uk.png" 
                    alt="Image 3" 
                    width={100} 
                    height={100} 
                    className="object-contain"
                />
            </div>
            <div className="m-2">
                <Image 
                    src="/images/flags/rs.png" 
                    alt="Image 4" 
                    width={100} 
                    height={100} 
                    className="object-contain"
                />
            </div>
        </div>
    );
}