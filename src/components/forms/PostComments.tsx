import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { PostValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useCreateComments, useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../shared/Loader";

type PostFormProps = {
    comment?: Models.Document;
    action: "Create" | "Update";
};

const PostComments = ({ comment, action }: PostFormProps) => {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const { toast } = useToast();

    // Query
    const { mutateAsync: createComments, isPending: isLoadingCreate } = useCreateComments();
    const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();
    
    // 1. Define your form.
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: comment ? comment?.caption: "",
            file:[],
            tags: comment ? comment.tags.join(',') : '',
        },
    })
    
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof PostValidation>) {
        if (comment && action === "Update") {
            const updatedPost = await updatePost({
                ...values,
                postId: comment.$id,
                imageId: comment.imageId,
                imageUrl: comment.imageUrl,
            });
            if (!updatedPost) {
                toast({
                    title: `${action} post failed. Please try again.`,
                });
            }
            return navigate(`/posts/${comment.$id}`);
        }
        
        const newComment = await createComments({
            ...values,
            userId: user.id,
            text: values.caption, 
        });
        

        if(!newComment){
            toast({
                title: `Please try again.`,
            });
        }
        navigate("/");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
            <FormField
                control={form.control}
                name="caption"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="shad-form_label">Question</FormLabel>
                    <FormControl>
                        <Textarea className="shad-textarea custom-scrollbar" {...field} />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="shad-form_label">Add Photos</FormLabel>
                    <FormControl>
                        <FileUploader
                            fieldChange={field.onChange}
                            mediaUrl={comment?.imageUrl}
                        />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="shad-form_label">Add Tags</FormLabel>
                    <FormControl>
                        <Input type="text" className="shad-input" placeholder="Calculus, Algorithm, Computer Architectures" {...field}/>
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                </FormItem>
                )}
            />
            <div className="flex gap-4 items-center justify-center">
                <Button
                    type="button"
                    className="shad-button_dark_4 whitespace-nowrap"
                    onClick={() => navigate(-1)}>
                    Cancel
                </Button>
                
                <Button
                    type="submit"
                    className="shad-button_primary whitespace-nowrap"
                    disabled={isLoadingCreate || isLoadingUpdate}>
                    {(isLoadingCreate || isLoadingUpdate) && <Loader />}
                    {action} Post
                </Button>
            </div>
            </form>
        </Form>
    )
}

export default PostComments;
