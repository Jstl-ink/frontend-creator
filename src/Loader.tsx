import {IconLoader2} from '@tabler/icons-react';

export default function Loader() {
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <IconLoader2 className="animate-spin" stroke={2} color="white"/>
        </div>
    )
}