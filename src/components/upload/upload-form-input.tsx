'use client';

import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { MotionDiv } from '../common/motion-wrapper';
import { itemVariants } from '@/utils/constants';

interface UploadFormInputProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    disabled?: boolean;
}

export const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(({ onSubmit, isLoading, disabled }, ref) => {
    return (
        <form cy-data="upload-form" ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
            <MotionDiv
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="flex justify-end items-center gap-1.5">
                <Input id="file"
                    cy-data="file-input"
                    type="file"
                    name="file"
                    accept='application/pdf'
                    required
                    disabled={isLoading || disabled}
                    className={cn(
                        "cursor-pointer",
                        isLoading && "cursor-not-allowed opacity-50"
                    )} />
                <Button 
                    cy-data="upload-submit"
                    disabled={isLoading || disabled}
                >
                    {isLoading ?
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Loading...
                        </>
                        : "Upload your PDF"}
                </Button>
            </MotionDiv>
        </form>
    );
});

UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;
