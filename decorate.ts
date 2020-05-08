export const GValidate = (params: string)=>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function(target: any, methodName: any, descriptor: any) {
        const oldMethod = descriptor.value;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        descriptor.value = function(...args){
            (this.$refs[params] as HTMLFormElement).validate(async valid => {
                if(valid) {
                    oldMethod.apply(this, args)
                }else{
                return false
              }
            });
        }
        return descriptor
    }
}