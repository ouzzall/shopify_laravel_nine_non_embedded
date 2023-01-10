<?php namespace App\Jobs;

use App\Models\Collection;
use App\Models\CollectionProduct;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Osiset\ShopifyApp\Objects\Values\ShopDomain;
use stdClass;
use Osiset\ShopifyApp\Contracts\Commands\Shop;
use Osiset\ShopifyApp\Contracts\Queries\Shop as QueriesShop;
use Osiset\ShopifyApp\Actions\CancelCurrentPlan;

class CollectionsDeleteJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Shop's myshopify domain
     *
     * @var ShopDomain|string
     */
    public $shopDomain;

    /**
     * The webhook data
     *
     * @var object
     */
    public $data;

    /**
     * Create a new job instance.
     *
     * @param string   $shopDomain The shop's myshopify domain.
     * @param stdClass $data       The webhook data (JSON decoded).
     *
     * @return void
     */
    public function __construct($shopDomain, $data)
    {
        $this->shopDomain = $shopDomain;
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(Shop $shopCommand, QueriesShop $shopQuery, CancelCurrentPlan $cancelCurrentPlanAction): bool
    {
        $this->shopDomain = ShopDomain::fromNative($this->shopDomain);

        $shop = $shopQuery->getByDomain($this->shopDomain);
        $shopId = $shop->getId();

        // sync_products($shop);

        $deletion_object = $this->data;
        // Log::info(json_encode($this->data));

        Collection::where('collection_id',$deletion_object->id)->delete();
        CollectionProduct::where('collection_id',$deletion_object->id)->delete();

        return true;
    }
}
