export type SetModalCallback = () => void;

export default interface IModalPros{
    imagens: [{
        ServerRelativeUrl: string;
    }];
    showModal: boolean;
    onPress: SetModalCallback
    
}